<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Личный кабинет");
use \Bitrix\Main\Application;
CModule::IncludeModule('iblock');

use Bitrix\Highloadblock\HighloadBlockTable as HLBT;
use Bitrix\Main\Loader;
use Bitrix\Main\Entity;
CModule::IncludeModule('highloadblock');

function GetEntityDataClass($HlBlockId) 
{
    if (empty($HlBlockId) || $HlBlockId < 1)
    {
        return false;
    }
    $hlblock = HLBT::getById($HlBlockId)->fetch();
    $entity = HLBT::compileEntity($hlblock);
    $entity_data_class = $entity->getDataClass();
    return $entity_data_class;
}

global $USER;

if(!$USER->IsAuthorized()) LocalRedirect('/');
$idUser = $USER->GetId();

$filter = Array('ID' => $idUser);

$arParameters = array(
    'FIELDS' => array('ID', 'NAME', 'EMAIL', 'PERSONAL_PHONE', 'LOGIN'),
    'SELECT' => array('UF_BRAND', 'UF_BRAND_LINK', 'UF_DEL_ADRESS', 'UF_Y_DRIVE')
);

$arUser = CUser::GetList(
    ($by = "ID"),
    ($order = "ASC"),
    $filter,
    $arParameters
)->GetNext();


$tz = CIBlockElement::GetList(
    array("SORT"=>"ASC"),
    array('IBLOCK_ID' => 27, 'ACTIVE' => 'Y'),
    false,
    false,
    array('ID','NAME','PROPERTY_SHABLON_TZ', 'PROPERTY_RETUSH_FORM')
)->GetNext();

$ordersFilter = array('UF_USER_ID'=> $idUser);

if(!empty($_GET['ORDER_STATUS'])){
    $ordersFilter += array('UF_ORDER_STATUS' => $_GET['ORDER_STATUS']);
}
if(!empty($_GET['DATE_FROM'])){
    $ordersFilter += array(">=UF_ORDER_DATE" => $_GET['DATE_FROM']);
}
if(!empty($_GET['DATE_UNTIL'])){
    $ordersFilter += array("<=UF_ORDER_DATE" => $_GET['DATE_UNTIL']);
}
if(!empty($_GET['PAYMENT_STATUS'])){
    $ordersFilter += array("UF_OPLATA" => $_GET['PAYMENT_STATUS']);
}

if($_GET['FILTER'] == 'Y'){
    $filterActive = "active";
    $profileActive = "";
    $profileChecked = "";
    $filterChecked = "checked";
    $filterStyle = 'style="display: flex;"';
} else{
    $filterActive = "";
    $profileActive = "active";
    $filterChecked = "";
    $profileChecked = "checked";
    $filterStyle = 'style="display: none;"';
}

// Получение заказов
const MY_HL_BLOCK_ID_ORDERS = 1;
CModule::IncludeModule('highloadblock');
$entity_data_class = GetEntityDataClass(MY_HL_BLOCK_ID_ORDERS);
$rsData = $entity_data_class::getList(array(
   "order" => array("ID" => "DESC"),
   'filter' => $ordersFilter
));
$favour = GetEntityDataClass(2)::getList(array(
       "select" => array("*"),
       "order" => array("ID" => "ASC"),
       "filter" => array("UF_USER"=>(int)$USER->GetId())  // Задаем параметры фильтра выборки
    ))->fetch();

$note = GetEntityDataClass(3)::getList(array(
       "select" => array("*"),
       "order" => array("ID" => "ASC"),
       "filter" => array("UF_USER"=>(int)$USER->GetId())  // Задаем параметры фильтра выборки
    ))->fetch();
if(!$favour || count($favour['UF_FAV']) == 0)
{
    $favour['UF_FAV'] = [0];
}
if(!$note)
{
    $note = [];
}
while($el = $rsData->fetch()){
    $orders[] = $el; 
}
//$count_orders = sizeof($Count);

$hlblock = HLBT::getById(1)->fetch(); //где ID - id highloadblock блока
$entity = HLBT::compileEntity($hlblock);

/*$rsType = CUserFieldEnum::GetList(array(), array(
                                'USER_FIELD_NAME' => 'UF_STATUS',
                                'USER_FIELD_ID' => $orders[0]['ID']
                            ))->GetNext();*/

$fields = $entity->getFields();

$property = CIBlockProperty::GetPropertyEnum(
    11,
    array("SORT"=>"asc"),
    array()
)->GetNext();

$rsUser = CUser::GetList($by, $order,
    array(
        "ID" => $idUser,
    ),
    array(
        "SELECT" => array(
            "UF_ORDER_TYPE",
        ),
    )
);

$rsStatus = CUserFieldEnum::GetList(array(), array(
    "ID" => $rsStatus["UF_ORDER_TYPE"],
    )
);
while($statusElem = $rsStatus->GetNext()){
    $arStatus[$statusElem['ID']] = $statusElem;
}
$all = $note['UF_YCS_PHOTO'] == 1 && $note['UF_STANDART']==1 && $note['UF_LIKE']==1 && $note['UF_ANNOUNCE']==1;
/*$rsBg = CUserFieldEnum::GetList(array(), array(
    "ID" => $rsBg["UF_FON"],
    )
);

while($bgElem = $rsBg->GetNext()){
    $arBg[$bgElem['ID']] = $bgElem;
}*/
/*echo "<pre>";
print_r($arBg);
echo "</pre>";*/
/*echo "<pre>";
//print_r($rsType);
//print_r($arStatus);
//print_r($fields);
print_r($orders);
echo "</pre>";*/

//$arStatus[$order['UF_ORDER_STATUS']]['VALUE'];

$prices = CIBlockElement::GetList(
    array("SORT"=>"ASC"),
    array('IBLOCK_ID' => 24, 'ACTIVE' => 'Y'),
    false,
    array("nTopCount" => 1),
    array('ID','NAME', 'PROPERTY_OD_PRICE_3', 'PROPERTY_OD_PRICE_10', 'PROPERTY_OD_PRICE_15', 'PROPERTY_OD_PRICE_25', 'PROPERTY_OD_PRICE_MORE', 'PROPERTY_OB_PRICE_3', 'PROPERTY_OB_PRICE_MORE', 'PROPERTY_UK_PRICE_3', 'PROPERTY_UK_PRICE_MORE', 'PROPERTY_SU_PRICE_3', 'PROPERTY_SU_PRICE_MORE', 'PROPERTY_BE_PRICE', 'PROPERTY_PROHODKA_PRICE', 'PROPERTY_IM_PROHODKA_PRICE',  'PROPERTY_CYCLO_PRICE',  'PROPERTY_CYCLO_BG_PRICE',  'PROPERTY_DYNAMIC_PROHODKA_PRICE',  'PROPERTY_CYCLO_BG_PRICE1', 'PROPERTY_DOP_OBRAZ_PRICE')
)->GetNext();

/*echo "<pre>";
print_r($arStatus);
echo "</pre>";*/

/*echo "<pre>";
print_r($prices);
echo "</pre>";*/

//Избранное
$resultFav =CIBlockElement::GetList(
    array("SORT"=>"ASC"),
    array('IBLOCK_ID' =>2, 'ACTIVE' => 'Y', 'ID'=> $favour['UF_FAV']),
    false,
    false,
    array('ID','NAME', 'DETAIL_PAGE_URL', 'PROPERTY_KATALOG', 'PROPERTY_DATA', 'PROPERTY_STATUS', 'PROPERTY_KARTINKA_ZAKAZ', 'PREVIEW_PICTURE')
);
if(is_null($_GET['FAV_PAGE']))
    $_GET['FAV_PAGE'] = 1;
$modelsCount = 8;
$count = 0;


// Обращения

// $rsProblems = CIBlockPropertyEnum::GetList(
//     Array("SORT"=>"ASC", "VALUE"=>"ASC"),
//     Array("IBLOCK_ID" => 32, "CODE" => "SUBJECT")
// );

// $subject = array();

// while($elem = $rsProblems->GetNext()){
//     $subject[] = $elem;
// }

$rsRequests =CIBlockElement::GetList(
    array("İD"=>"DESC"),
    array('IBLOCK_ID' =>32, "PROPERTY_USER_ID" => $idUser),
    false,
    false,
    array(
        'ID', 
        "PROPERTY_REQUEST_NUM", 
        "PROPERTY_ORDER_ID", 
        "PROPERTY_CHAT_ID", 
        "PROPERTY_DATE", 
        "PROPERTY_SUBJECT.NAME", 
        "PROPERTY_STATUS")
);

$requests = array();

while($requestElem = $rsRequests->GetNext()){
    $requests[] = $requestElem;
}


// Обращения разделы


$rsProblems = CIBlockSection::GetList(
    Array("SORT"=>"ASC"),
    Array("IBLOCK_ID" => 33, "ACTIVE" => "Y"),
    false,
    Array("ID", "NAME"),
    false
);

$problems = array();

while($problem = $rsProblems->GetNext()){
    $problems[] = $problem;
}

// echo "<pre>";
//     print_r($requests);
// echo "</pre>";
?>
<main>
    <section class="personal">
        <div class="container personal__container active">
            <nav class="personal__navigation">
                <h1 class="personal__title title mobile">
                    личный кабинет
                </h1>
                <div class="personal__tabs">
                    <label for="personal-form" class="personal__tab <?=$profileActive?>">
                        <span>Личные данные</span>
                        <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.5303 5.46966C34.8232 5.76255 34.8232 6.23743 34.5303 6.53032L29.7574 11.3033C29.4645 11.5962 28.9896 11.5962 28.6967 11.3033C28.4038 11.0104 28.4038 10.5355 28.6967 10.2426L32.9393 5.99999L28.6967 1.75735C28.4038 1.46446 28.4038 0.989584 28.6967 0.69669C28.9896 0.403797 29.4645 0.403797 29.7574 0.69669L34.5303 5.46966ZM-2.21771e-07 5.25L34 5.24999L34 6.74999L2.21771e-07 6.75L-2.21771e-07 5.25Z" fill="#242424"/>
                        </svg>
                    </label>
                    <label for="personal-orders" class="personal__tab <?=$filterActive?>">
                        <span>Мои заказы</span>
                        <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.5303 5.46966C34.8232 5.76255 34.8232 6.23743 34.5303 6.53032L29.7574 11.3033C29.4645 11.5962 28.9896 11.5962 28.6967 11.3033C28.4038 11.0104 28.4038 10.5355 28.6967 10.2426L32.9393 5.99999L28.6967 1.75735C28.4038 1.46446 28.4038 0.989584 28.6967 0.69669C28.9896 0.403797 29.4645 0.403797 29.7574 0.69669L34.5303 5.46966ZM-2.21771e-07 5.25L34 5.24999L34 6.74999L2.21771e-07 6.75L-2.21771e-07 5.25Z" fill="#242424"/>
                        </svg>
                    </label>
                    <label for="personal-likes" class="personal__tab">
                        <span>Избранное</span>
                        <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.5303 5.46966C34.8232 5.76255 34.8232 6.23743 34.5303 6.53032L29.7574 11.3033C29.4645 11.5962 28.9896 11.5962 28.6967 11.3033C28.4038 11.0104 28.4038 10.5355 28.6967 10.2426L32.9393 5.99999L28.6967 1.75735C28.4038 1.46446 28.4038 0.989584 28.6967 0.69669C28.9896 0.403797 29.4645 0.403797 29.7574 0.69669L34.5303 5.46966ZM-2.21771e-07 5.25L34 5.24999L34 6.74999L2.21771e-07 6.75L-2.21771e-07 5.25Z" fill="#242424"/>
                        </svg>
                    </label>
                    <label for="personal-call" class="personal__tab">
                        <span>Уведомления</span>
                        <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.5303 5.46966C34.8232 5.76255 34.8232 6.23743 34.5303 6.53032L29.7574 11.3033C29.4645 11.5962 28.9896 11.5962 28.6967 11.3033C28.4038 11.0104 28.4038 10.5355 28.6967 10.2426L32.9393 5.99999L28.6967 1.75735C28.4038 1.46446 28.4038 0.989584 28.6967 0.69669C28.9896 0.403797 29.4645 0.403797 29.7574 0.69669L34.5303 5.46966ZM-2.21771e-07 5.25L34 5.24999L34 6.74999L2.21771e-07 6.75L-2.21771e-07 5.25Z" fill="#242424"/>
                        </svg>
                    </label>
                    <label for="personal-request" class="personal__tab">
                        <span>Обращения</span>
                        <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.5303 5.46966C34.8232 5.76255 34.8232 6.23743 34.5303 6.53032L29.7574 11.3033C29.4645 11.5962 28.9896 11.5962 28.6967 11.3033C28.4038 11.0104 28.4038 10.5355 28.6967 10.2426L32.9393 5.99999L28.6967 1.75735C28.4038 1.46446 28.4038 0.989584 28.6967 0.69669C28.9896 0.403797 29.4645 0.403797 29.7574 0.69669L34.5303 5.46966ZM-2.21771e-07 5.25L34 5.24999L34 6.74999L2.21771e-07 6.75L-2.21771e-07 5.25Z" fill="#242424"/>
                        </svg>
                    </label>
                    <a href="" class="personal__tab btn-exit">
                        <span>Выйти</span>
                    </a>
                </div>
                <div class="personal__nav-links">
                    <!-- <a href="" class="personal__nav-link">
                        <img src="<?//= SITE_TEMPLATE_PATH ?>/img/personal-nav-img1.webp" alt="" class="personal__nav-link-bg">
                        <p class="personal__nav-link-sub-title">Ваши фото</p>
                        <p class="personal__nav-link-title">
                            Невидимый манекен/предметка
                        </p>
                    </a> -->
                    <a href="<?=$arUser['UF_Y_DRIVE']?>" target="_blank" class="personal__nav-link">
                        <img src="<?= SITE_TEMPLATE_PATH ?>/img/personal-nav-img2.webp" alt="" class="personal__nav-link-bg">
                        <p class="personal__nav-link-sub-title"><!-- Ваши фото --></p>
                        <p class="personal__nav-link-title">
                            <!-- Сборная съемка -->Ваши фото
                        </p>
                    </a>
                    <a href="<?=$tz['PROPERTY_RETUSH_FORM_VALUE']?>" target="_blank" class="personal__nav-link">
                        <img src="<?= SITE_TEMPLATE_PATH ?>/img/personal-nav-img3.webp" alt="" class="personal__nav-link-bg">
                        <p class="personal__nav-link-title">
                            Форма на ретушь
                        </p>
                    </a>
                </div>
            </nav>
            <div class="personal__content">
                <div class="personal__tab-content form <?=$profileActive?>">
                    <input id="personal-form" type="radio" name="personal" <?=$profileChecked?>>
                    <button type="button" class="personal__back-link">
                        <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z" fill="#242424"/>
                        </svg>
                        <span>Назад</span>
                    </button>
                    <div class="personal__tab-header">
                        <div class="personal__title-box">
                            <p class="personal__title title">
                                <span>личные</span> данные
                            </p>
                        </div>
                    </div>
                    <form class="form__wrap">
                        <div class="form__filter-item">
                            <p class="form__filter-name">
                                Контактное лицо
                            </p>
                            <label class="form__filter-label">
                                <input placeholder="ФИО" type="text" class="form__input" value="<?=$arUser['NAME']?>" name="FIO">
                            </label>
                        </div>
                        <div class="form__filter-item">
                            <p class="form__filter-name">
                                Номер телефона
                            </p>
                            <label class="form__filter-label">
                                <input placeholder="Телефон" type="tel" class="form__input mask-phone" value="<?=$arUser['PERSONAL_PHONE']?>" name="TELEPHONE">
                            </label>
                        </div>
                        <div class="form__filter-item">
                            <p class="form__filter-name">
                                E-mail
                            </p>
                            <label class="form__filter-label">
                                <input placeholder="Почта" type="email" class="form__input" value="<?=$arUser['EMAIL']?>" name="EMAIL">
                            </label>
                        </div>
                        <div class="form__filter-item">
                            <p class="form__filter-name">
                                Название бренда
                            </p>
                            <label class="form__filter-label">
                                <input placeholder="Бренд" type="text" class="form__input" value="<?=$arUser['UF_BRAND']?>" name="BRAND_NAME">
                            </label>
                        </div>
                        <div class="form__filter-item">
                            <p class="form__filter-name">
                                Ссылка на ваш бренд
                            </p>
                            <label class="form__filter-label">
                                <input placeholder="Ссылка на сайт" type="text" class="form__input" value="<?=$arUser['UF_BRAND_LINK']?>" name="BRAND_LINK">
                            </label>
                        </div>
                        <div class="form__filter-item">
                            <p class="form__filter-name">
                                Адрес для отправки изделий
                            </p>
                            <label class="form__filter-label">
                                <input placeholder="Адрес офиса или адрес ПВЗ СДЭК" type="text" class="form__input" value="<?=$arUser['UF_DEL_ADRESS']?>" name="DEL_ADRESS">
                            </label>
                        </div>
                    </form>
                    <div class="form__filter-item" id="data-message">
                        <!-- <p class="form__filter-name" style="color: green; ">
                            Данные успешно обновлены!
                        </p> -->
                    </div>
                    <div class="form__filter-footer">
                        <button class="form__filter-reset">отменить</button>
                        <button class="form__filter-submit link" id="update-button">
                            <span>Сохранить</span>
                        </button>
                    </div>
                </div>
                <div class="personal__tab-content orders <?=$filterActive?>">
                    <input id="personal-orders" type="radio" name="personal" <?=$filterChecked?>>
                    <button type="button" class="personal__back-link">
                        <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z" fill="#242424"/>
                        </svg>
                        <span>Назад</span>
                    </button>
                    <div class="personal__tab-header">
                        <div class="personal__title-box">
                            <p class="personal__title title">
                                <span>Мои Заказы</span>
                            </p>
                            <button type="button" class="orders__filter-btn <?=$filterActive?>">
                                <span class="filter-hide desktop">Фильтр</span>
                                <span class="filter-open desktop">Cкрыть фильтр</span>
                                <span class="filter-hide mobile">Фильтр</span>
                                <span class="filter-open mobile">скрыть</span>
                            </button>
                        </div>
                        <form class="orders__filter filter_ajax" style="display: flex">
                            <div class="orders__filter-item">
                                <p class="orders__filter-name">
                                    Статус заказа
                                </p>
                                <label class="orders__filter-label">
                                    <select class="orders__input" name="ORDER_STATUS">
                                        <?
                                        $selectedCount = 0;
                                        foreach($arStatus as $value){
                                            if($value['USER_FIELD_ID'] != 11){
                                                continue;
                                            }
                                            if($value['ID'] == $ordersFilter['UF_ORDER_STATUS']){
                                                $isSelected = "selected";
                                                $selectedCount++;
                                            } else{
                                                $isSelected = "";
                                            }?>
                                            <option value="<?=$value['ID']?>" <?=$isSelected?>><?=$value['VALUE']?></option>
                                        <?}
                                        if($selectedCount == 0){
                                            $isSelected = "selected";
                                        } else{
                                            $isSelected = "";
                                        }
                                        ?>

                                        <option id="order_all" value="" <?=$isSelected?>>Все</option>
                                    </select>
                                    <svg class="orders__filter-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1.0332L6 6.0332L11 1.0332" stroke="#242424" stroke-width="2"/>
                                    </svg>
                                </label>
                            </div>
                            <div class="orders__filter-item">
                                <p class="orders__filter-name">
                                    Статус оплаты
                                </p>
                                <label class="orders__filter-label">
                                    <select class="orders__input"  name="PAYMENT_STATUS">
                                        <?
                                        $selectedCount = 0;
                                        foreach($arStatus as $value){
                                            if($value['USER_FIELD_ID'] != 27){
                                                continue;
                                            }
                                            if($value['ID'] == $ordersFilter['UF_OPLATA']){
                                                $isSelected = "selected";
                                                $selectedCount++;
                                            } else{
                                                $isSelected = "";
                                            }?>
                                            <option value="<?=$value['ID']?>" <?=$isSelected?>><?=$value['VALUE']?></option>
                                        <?}
                                        if($selectedCount == 0){
                                            $isSelected = "selected";
                                        } else{
                                            $isSelected = "";
                                        }
                                        ?>
                                        <option id="payment_all" value="" <?=$isSelected?>>Все</option>
                                    </select>
                                    <svg class="orders__filter-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1.0332L6 6.0332L11 1.0332" stroke="#242424" stroke-width="2"/>
                                    </svg>
                                </label>
                            </div>
                            <div class="orders__filter-item">
                                <p class="orders__filter-name">
                                    Дата съемки
                                </p>
                                <div class="orders__dates-box">
                                    <label class="orders__filter-label">
                                        <input placeholder="С" value="<?=$ordersFilter['>=UF_ORDER_DATE']?>" type="text" class="orders__input input-date" name="DATE_FROM">
                                        <input type="date">
                                        <svg class="orders__dates-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.75 8.24992V16.4999C2.75 18.525 4.39162 20.1666 6.41667 20.1666H15.5833C17.6084 20.1666 19.25 18.525 19.25 16.4999V8.24992M2.75 8.24992V6.87492C2.75 4.84987 4.39162 3.20825 6.41667 3.20825H15.5833C17.6084 3.20825 19.25 4.84987 19.25 6.87492V8.24992M2.75 8.24992H19.25M14.6667 1.83325V4.58325M7.33333 1.83325V4.58325" stroke="#969696" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                    </label>
                                    <label class="orders__filter-label">
                                        <input placeholder="По" value="<?=$ordersFilter['<=UF_ORDER_DATE']?>" type="text" class="orders__input input-date" name="DATE_UNTIL">
                                        <input type="date">
                                        <svg class="orders__dates-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.75 8.24992V16.4999C2.75 18.525 4.39162 20.1666 6.41667 20.1666H15.5833C17.6084 20.1666 19.25 18.525 19.25 16.4999V8.24992M2.75 8.24992V6.87492C2.75 4.84987 4.39162 3.20825 6.41667 3.20825H15.5833C17.6084 3.20825 19.25 4.84987 19.25 6.87492V8.24992M2.75 8.24992H19.25M14.6667 1.83325V4.58325M7.33333 1.83325V4.58325" stroke="#969696" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                            <div class="orders__filter-footer">
                                <button type="button" class="orders__filter-reset ajax_reset">Сбросить</button>
                                <button type="button" class="orders__filter-submit link filter_ajax_success">
                                    <span>пРИМЕНИТЬ</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="orders__content">
                        <div class="orders_items">
                            <?foreach($orders as $order){
                                $modelElem = CIBlockElement::GetList(
                                    array(),
                                    array('IBLOCK_ID' => 2, 'ACTIVE' => 'Y', 'ID' => $order['UF_MODEL_ID']),
                                    false,
                                    Array('nTopCount'=>12),
                                    array('ID','NAME','PROPERTY_KARTINKA_ZAKAZ')
                                )->GetNext();
                                    
                                if($order['ID'] == $_GET['ORDER']){
                                    $orderActive = "active";
                                    $orderStyle = "style='display: block'";
                                } else{
                                    $orderActive = "";
                                    $orderStyle = "";
                                }
                                ?>
                                <div class="orders_item">
                                    <div class="orders_item__img">
                                        <img src="<?=CFile::GetPath($modelElem['PROPERTY_KARTINKA_ZAKAZ_VALUE'])?>" alt="">

                                        <!-- <div class="orders__item-date"><?=$order['UF_MODEL_DATE']?></div> -->
                                    </div>
                                    <div class="orders_item__info">
                                        <div class="orders_item__top">
                                            <div class="orders_item__num">№ <?=$order['ID']?></div>
                                            <div class="orders_item__date"><?=$order['UF_MODEL_DATE']?></div>
                                        </div>
                                        <div class="orders_item__details">
                                            <div class="orders_item__detail">
                                                <span class="title">Тип заказа</span>
                                                <span><?=$order['UF_ORDER_TYPE']?></span>
                                            </div>
                                            <div class="orders_item__detail">
                                                <span class="title">Статус</span>
                                                <?if(($order['UF_OPLATA'] == 10)&&($order['UF_ORDER_STATUS'] != 15)){?>
                                                    <span>Ожидает предоплаты</span>
                                                <?} else{?>
                                                    <span><?=$arStatus[$order['UF_ORDER_STATUS']]['VALUE']?></span>
                                                <?}?>
                                                
                                            </div>
                                            <div class="orders_item__detail">
                                                <span class="title">Модель</span>
                                                <span><?=$modelElem['NAME']?></span>
                                            </div>
                                            <div class="orders_item__detail">
                                                <span class="title">Стоимость</span>
                                                <span><?=$order['UF_PRICE']?> ₽</span>
                                            </div>
                                            <a href="/cabinet/order/<?=$order['ID']?>/" class="orders_item__link link">Подробнее</a>
                                        </div>
                                    </div>
                                    <!-- <div class="orders__item-content <?=$orderActive?>">
                                        <div class="orders__item-header">
                                            <div class="orders__item-img-box mobile">
                                                <img src="<?=CFile::GetPath($modelElem['PROPERTY_KARTINKA_ZAKAZ_VALUE'])?>" alt="">
                                                <div class="orders__item-date"><?=$order['UF_ORDER_DATE']?></div>
                                            </div>
                                            <div class="orders__header-box">
                                                <div class="orders__header-item">
                                                    <p>№ заказа</p>
                                                    <p><?=$order['ID']?></p>
                                                </div>
                                                <div class="orders__header-item">
                                                    <p>тип заказа</p>
                                                    <p><?=$order['UF_ORDER_TYPE']?></p>
                                                </div>
                                                <div class="orders__header-item">
                                                    <p>общ. стоимость</p>
                                                    <p><?=$order['UF_PRICE']?> ₽</p>
                                                </div>
                                                <?
                                                
                                                ?>
                                                <div class="orders__header-item">
                                                    <p>статус</p>
                                                    <?if(($order['UF_OPLATA'] == 10)&&($order['UF_ORDER_STATUS'] != 15)){?>
                                                        
                                                        <p id="order-status">Ожидает предоплаты</p>
                                                    <?} else{?>
                                                        <p id="order-status"><?=$arStatus[$order['UF_ORDER_STATUS']]['VALUE']?></p>
                                                    <?}?>
                                                </div>
                                                <button type="button" class="orders__price-btn desktop">
                                                    <span class="price-hide">Подробнее</span>
                                                    <span class="price-open">скрыть</span>
                                                    <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1.00012L7.5 7.00012L14 1.00012" stroke="#242424" stroke-width="2"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="orders__price-box" <?=$orderStyle?>>
                                            <ul class="orders__price-list">
                                                <li class="orders__price-item">
                                                    <p>модель</p>
                                                    <p><?=$modelElem['NAME']?></p>
                                                </li>
                                                <li class="orders__price-item">
                                                    <p>дата оформления заказа</p>
                                                    <p><?=$order['UF_ORDER_DATE']?></p>
                                                </li>
                                                <li class="orders__price-item">
                                                    <p>кол-во артикулов</p>
                                                    <p><?=$order['UF_ARTICLES_COUNT']?></p>
                                                </li>
                                                <? if($order['UF_ASOS_ART'] > 0){?>
                                                    <li class="orders__price-item">
                                                        <p>одежда (<?=$order['UF_ASOS_ART']?> шт)</p>
                                                        <p><?=$order['UF_ASOS_PRICE']?> ₽</p>
                                                    </li>
                                                <?}?>
                                                <? if($order['UF_ODEJDA_ART'] > 0){?>
                                                    <li class="orders__price-item">
                                                        <p>одежда (<?=$order['UF_ODEJDA_ART']?> шт)</p>
                                                        <p><?=$order['UF_ODEJDA_PRICE']?> ₽</p>
                                                    </li>
                                                <?}?>
                                                <? if($order['UF_OBUV_ART'] > 0){?>
                                                    <li class="orders__price-item">
                                                        <p>обувь/аксессуары (<?=$order['UF_OBUV_ART']?> шт)</p>
                                                        <p><?=$order['UF_OBUV_PRICE']?> ₽</p>
                                                    </li>
                                                <?}?>
                                                <? if($order['UF_SUMKA_ART'] > 0){?>
                                                    <li class="orders__price-item">
                                                        <p>сумка (<?=$order['UF_SUMKA_ART']?> шт)</p>
                                                        <p><?=$order['UF_SUMKA_PRICE']?> ₽</p>
                                                    </li>
                                                <?}?>
                                                <? if($order['UF_JEW_ART'] > 0){?>
                                                    <li class="orders__price-item">
                                                        <p>украшения (<?=$order['UF_JEW_ART']?> шт)</p>
                                                        <p><?=$order['UF_JEW_PRICE']?> ₽</p>
                                                    </li>
                                                <?}?>
                                                <? if($order['UF_BELIE_ART'] > 0){?>
                                                    <li class="orders__price-item">
                                                        <p>белье (<?=$order['UF_BELIE_ART']?> шт)</p>
                                                        <p><?=$order['UF_BELIE_PRICE']?> ₽</p>
                                                    </li>
                                                <?}?>
                                                <? if($order['UF_WB_WALK'] > 0){?>
                                                    <li class="orders__price-item">
                                                        <p>проходка для wb (<?=$order['UF_WB_WALK']?> шт)</p>
                                                        <p><?=$order['UF_WB_PRICE']?> ₽</p>
                                                    </li>
                                                <?}?>
                                                <? if($order['UF_DYNAMIC_WALK'] > 0){?>
                                                    <li class="orders__price-item">
                                                        <p>динамичная проходка (<?=$order['UF_DYNAMIC_WALK']?> шт)</p>
                                                        <p><?=$order['UF_DYNAMIC_PRICE']?> ₽</p>
                                                    </li>
                                                <?}?>
                                                <?if($order['UF_INST_WALK'] > 0){?>
                                                    <li class="orders__price-item">
                                                        <p>имиджевое для инстаграм (<?=$order['UF_INST_WALK']?> шт)</p>
                                                        <p><?=$order['UF_IMIIJ_PRICE']?> ₽</p>
                                                    </li>
                                                <?}?>
                                            </ul>
                                            <p class="orders__price-title">Доп. услуги</p>
                                            <ul class="orders__price-list">
                                                <?if($order['UF_DOP_OBRAZ'] > 0){?>
                                                    <li class="orders__price-item">
                                                        <p>дополнительные образы (<?=$order['UF_DOP_OBRAZ']?> шт)</p>
                                                        <p><?=$order['UF_DOP_OBRAZ_PRICE']?> ₽</p>
                                                    </li>
                                                <?}?>
                                                <?if($order['UF_OBRAZ_OB'] > 0){?>
                                                <li class="orders__price-item">
                                                    <p>дополнительные образы (смена обуви) (<?=$order['UF_OBRAZ_OB']?> шт)</p>
                                                    <p><?=$order['UF_OBRAZ_OB_PRICE']?> ₽</p>
                                                </li>
                                                <?}?>
                                                <?if($order['UF_OBRAZ_OB_JEW'] > 0){?>
                                                <li class="orders__price-item">
                                                    <p>дополнительные образы (смена обуви и аксессуаров) (<?=$order['UF_OBRAZ_OB_JEW']?> шт)</p>
                                                    <p><?=$order['UF_OBRAZ_OB_JEW_PRICE']?> ₽</p>
                                                </li>
                                                <?}?>
                                                <li class="orders__price-item">
                                                    <p>Фон</p>
                                                    <p><?=$arStatus[$order['UF_FON']]['VALUE']?></p>
                                                </li>
                                            </ul>
                                            <?if($order['UF_ORDER_STATUS'] == 1){
                                                $fileName = "отправить файл ТЗ на фотосъемку";
                                                if(!empty($order['UF_TZ'])&&($order['UF_TZ'] != 0)){
                                                    $file = CFile::GetByID($order['UF_TZ'])->GetNext();
                                                    $fileName = $file['ORIGINAL_NAME'];
                                                }?>
                                                <div class="record__photo-article-btns-block">
                                                    <div class="record__photo-article-btns record__photo-article-btns--cabinet">
                                                    	<?
                                                    	//Проверяем, что до заказа более 3-ех дней
        		                                        $modelDate = strtotime($order['UF_MODEL_DATE']); // Дата модели
        		                                        $today = date("d.m.Y"); // Текущая дата
        		                                        $test1 = strtotime($today);
        		                                        $result = ($modelDate - $test1)/(60*60*24); // Разница между датами в днях
        		                                        if(($result > 3)&&($order['UF_ORDER_STATUS'] == 1)){
        		                                        ?>
                                                        	<button class="cancel_order_ajax all-btn record__photo-article-link" data-type="<?=$order["ID"]?>"><span>Отменить <??></span></button>
                                                        <?}?>
                                                        <?
                                                        if(($order['UF_OPLATA'] == 10)&&($order['UF_ORDER_STATUS'] != 15)){?>
                                                            <button style="margin-top: 2rem;" class="prepayment-ajax all-btn record__photo-article-link" data-type="<?=$order["ID"]?>"><span>Внести предоплату</span></button>
                                                        <?}?>
                                                    </div>    

                                                    <div class="record__photo-article-btns record__photo-article-btns--cabinet">
                                                        <a  href="<?=CFile::GetPath($tz['PROPERTY_SHABLON_TZ_VALUE'])?>" class="all-btn record__photo-article-link" download>Скачать шаблон тз</a>
                                                        <form>
                                                            <label class="record__photo-input-file">
                                                                <input type="file" id="TZ" data-index="<?=$order['ID']?>" name="FILE">      
                                                                <span class="all-btn"><?=$fileName?></span>
                                                            </label>

                                                        </form>
                                                        <div style="display: none; margin-top: 2rem;" class="ajax_load_file">
                                                            <button data-index="<?=$order['ID']?>" class="ajax__load-button link">Згарузить</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            <?}?>
                                            <?if(($order['UF_ORDER_STATUS'] == 2)&&($order['UF_TO_PAY'] > 0)){?>
                                                <button class="full_payment_ajax link" data-type="<?=$order['ID']?>">
                                                    Оплатить <?=$order['UF_TO_PAY']?> ₽
                                                </button>
                                            <?}?>
                                            
                                        </div>
                                    </div> -->
                                    <!-- <button type="button" class="orders__price-btn mobile">
                                        <span class="price-hide">Подробнее</span>
                                        <span class="price-open">скрыть</span>
                                        <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1.00012L7.5 7.00012L14 1.00012" stroke="#242424" stroke-width="2"/>
                                        </svg>
                                    </button> -->
                                </div>
                            <?}?>
                        </div>
                    </div>
                </div>
                <div class="personal__tab-content likes-order <?=$filterActive?>">
                    <input id="personal-likes" type="radio" name="personal">
                    <button type="button" class="personal__back-link">
                        <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z" fill="#242424"/>
                        </svg>
                        <span>Назад</span>
                    </button>
                    <div class="personal__tab-header">
                        <div class="personal__title-box">
                            
                            <p class="personal__title title">
                                <span>избранные</span> модели 
                            </p>
                        </div>
                        <div class="personal__tab-models-wrapper">
                            <?while ($model = $resultFav->getNext()):
                            $count++;
                                if($count == $_GET['FAV_PAGE']*$modelsCount)
                                    break;
                                ?>
                                <div class="model-wrapper">
                                    <a href="<?=$model["~DETAIL_PAGE_URL"]?>" class="model">
                                        <div class="model__image">
                                            <img src="<?=CFile::GetPath($model["PREVIEW_PICTURE"])?>" alt="" />
                                        </div>
                                        <div class="model__like ajax___like active" ajax_id="<?=$model['ID']?>">
                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M17.4545 2C15.1636 2 13.1716 3.00731 12 4.69539C10.8284 3.00731 8.83636 2 6.54545 2C4.81011 2.00197 3.14642 2.67501 1.91935 3.87146C0.692279 5.06792 0.00202103 6.6901 0 8.38214C0 11.4881 1.98545 14.7207 5.90182 17.9883C7.69642 19.4794 9.63492 20.7974 11.6902 21.924C11.7854 21.9739 11.8919 22 12 22C12.1081 22 12.2146 21.9739 12.3098 21.924C14.3651 20.7974 16.3036 19.4794 18.0982 17.9883C22.0145 14.7207 24 11.4881 24 8.38214C23.998 6.6901 23.3077 5.06792 22.0806 3.87146C20.8536 2.67501 19.1899 2.00197 17.4545 2ZM12 20.6263C10.2098 19.619 1.30909 14.309 1.30909 8.38214C1.31053 7.02845 1.86269 5.73061 2.84438 4.77341C3.82608 3.81621 5.15713 3.27784 6.54545 3.27643C8.75782 3.27643 10.6156 4.4284 11.3945 6.28348C11.4439 6.40053 11.5277 6.50065 11.6356 6.57111C11.7434 6.64157 11.8702 6.67919 12 6.67919C12.1298 6.67919 12.2566 6.64157 12.3644 6.57111C12.4723 6.50065 12.5561 6.40053 12.6055 6.28348C13.3844 4.4284 15.2422 3.27643 17.4545 3.27643C18.8429 3.27784 20.1739 3.81621 21.1556 4.77341C22.1373 5.73061 22.6895 7.02845 22.6909 8.38214C22.6909 14.309 13.7902 19.619 12 20.6263Z"
                                                />
                                                <path
                                                    class="model__like-heat"
                                                    d="M24 8.45986C24 15.7532 12.8796 21.6567 12.4061 21.9005C12.2813 21.9658 12.1417 22 12 22C11.8583 22 11.7187 21.9658 11.5939 21.9005C11.1204 21.6567 0 15.7532 0 8.45986C0.00198508 6.74719 0.702493 5.10522 1.94784 3.89418C3.19319 2.68314 4.88167 2.00193 6.64286 2C8.85536 2 10.7925 2.92522 12 4.48913C13.2075 2.92522 15.1446 2 17.3571 2C19.1183 2.00193 20.8068 2.68314 22.0522 3.89418C23.2975 5.10522 23.998 6.74719 24 8.45986Z"
                                                />
                                            </svg>
                                        </div>
                                        
                                        <div class="model__notif">
                                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_5619_1278)">
                                                    <path
                                                        d="M14.3744 17.25V17.9688C14.3744 18.7312 14.0715 19.4625 13.5324 20.0017C12.9932 20.5408 12.2619 20.8438 11.4994 20.8438C10.7369 20.8438 10.0057 20.5408 9.4665 20.0017C8.92733 19.4625 8.62443 18.7312 8.62443 17.9688V17.25M19.2116 15.7869C18.058 14.375 17.2436 13.6563 17.2436 9.76377C17.2436 6.19922 15.4234 4.92928 13.9252 4.3125C13.7262 4.23074 13.5389 4.04297 13.4782 3.83857C13.2154 2.94418 12.4787 2.15625 11.4994 2.15625C10.5201 2.15625 9.78296 2.94463 9.52287 3.83947C9.46222 4.04611 9.2749 4.23074 9.07589 4.3125C7.57595 4.93018 5.75751 6.19563 5.75751 9.76377C5.75527 13.6563 4.94083 14.375 3.78724 15.7869C3.30927 16.3718 3.72794 17.25 4.56394 17.25H18.4394C19.2709 17.25 19.6869 16.3691 19.2116 15.7869Z"
                                                        stroke="white"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_5619_1278">
                                                        <rect width="23" height="23" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div class="model__name"><?=$model["NAME"]?></div>
                                        <div class="model__catalog"><?=$model["PROPERTY_KATALOG_VALUE"]?></div>
                                        <? if($model["PROPERTY_STATUS_VALUE"] == 'Да'):?>
                                        <div class="model__status">повышенная стоимость</div>
                                        <?endif?>
                                        
                                    </a>
                                    <div class="model__notif-details">
                                        <div class="model__notif-details_top">
                                            <div class="model__notif-details_title">Уведомления</div>
                                            <div class="model__notif-details_close">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 0H0V20H20V0Z" fill="white" fill-opacity="0.01" />
                                                    <path d="M3 3L16 16" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M3 16L16 3" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
        
                                        <div class="model__notif-details_checkboxes">
                                            <div class="record__checkbox">
                                                <input class="record__custom-checkbox ajax"ajax_check = 'UF_YCS_MODELS' ajax__id = '<?=$model["ID"]?>' 
                                                type="checkbox" id="var-1" name="checkbox" value="новые даты Съемка в стиле ycs" 
                                                <?= !is_null($note['UF_YCS_MODELS']) && in_array($model["ID"], $note['UF_YCS_MODELS']) ? 'checked' :''?>/>
                                                <label for="var-1"><span>новые даты Съемка в стиле ycs</span></label>
                                            </div>
                                            <div class="record__checkbox">
                                                <input class="record__custom-checkbox ajax" ajax_check='UF_SIMPLE_MODELS' ajax__id = '<?=$model["ID"]?>' 
                                                type="checkbox" id="var-2" name="checkbox" value="новые даты Обычная съемка" 
                                                <?= !is_null($note['UF_SIMPLE_MODELS']) && in_array($model["ID"], $note['UF_SIMPLE_MODELS']) ? 'checked' :''?>/>
                                                <label for="var-2"><span>новые даты Обычная съемка</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?endwhile?>
                        </div>
                        <?if(count($favour['UF_FAV']) > 8):?>
                            <button  class="catalog__btn-all all-btn">Загрузить еще</button>
                        <?endif?>
                    </div>
                </div>
                <div class="personal__tab-content call-personal <?=$filterActive?>">
                    <input id="personal-call" type="radio" name="personal">
                    <button type="button" class="personal__back-link">
                        <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z" fill="#242424"/>
                        </svg>
                        <span>Назад</span>
                    </button>
                    <div class="personal__tab-header">
                        <div class="personal__title-box">
                            <p class="personal__title title">
                                <span>Настройки</span> уведомлений
                            </p>
                        </div>
                        <div class="personal__tab-wrapper-cheks">
                            <div class="record__checkbox record__custom-checkbox-ajax_checkpers">
                                <input class="record__custom-checkbox ajax ajax_check chk-all" type="checkbox" id="notif-1" name="checkbox" value="Выбрать все " <?=$all ? 'checked' :''?>>
                                <label for="notif-1"><span>Выбрать все</span></label>
                            </div>
                            <div class="record__checkbox record__custom-checkbox-ajax_checkpers">
                                <input class="record__custom-checkbox ajax ajax_checkItem" ajax_not = "UF_STANDART" type="checkbox" id="notif-2" name="checkbox" 
                                value="Анонс каталога стандарт" <?= $note['UF_STANDART'] == 1 ? 'checked' : ''?>>
                                >
                                <label for="notif-2"><span>Анонс каталога стандарт</span></label>
                            </div>
                            <div class="record__checkbox record__custom-checkbox-ajax_checkpers">
                                <input class="record__custom-checkbox ajax ajax_checkItem" ajax_not = "UF_YCS_PHOTO" type="checkbox" id="notif-3" name="checkbox" 
                                value="Анонс catalo PRO" <?= $note['UF_YCS_PHOTO'] == 1 ? 'checked' : ''?>>
                                <label for="notif-3"><span>Анонс catalog PRO</span></label>
                            </div>
<!--                             <div class="record__checkbox record__custom-checkbox-ajax_checkpers">
                                <input class="record__custom-checkbox ajax_checkItem"type="checkbox" id="notif-4" name="checkbox" 
                                value="Анонс фотоконтента на телефон">
                                <label for="notif-4"><span>Анонс фотоконтента на телефон</span></label>
                            </div>
                            <div class="record__checkbox record__custom-checkbox-ajax_checkpers">
                                <input class="record__custom-checkbox ajax_checkItem" type="checkbox" id="notif-5" name="checkbox" value="Анонс каталога в интерьере" >
                                <label for="notif-5"><span>Анонс каталога в интерьере</span></label>
                            </div> -->
                            <div class="record__checkbox record__custom-checkbox-ajax_checkpers">
                                <input class="record__custom-checkbox ajax ajax_checkItem" ajax_not = "UF_LIKE" type="checkbox" id="notif-6" name="checkbox" value="Анонс на избранных моделей" 
                                <?= $note['UF_LIKE'] == 1 ? 'checked' : ''?>>
                                <label for="notif-6"><span>Анонс на избранных моделей</span></label>
                            </div>
                            <div class="record__checkbox record__custom-checkbox-ajax_checkpers">
                                <input class="record__custom-checkbox ajax ajax_checkItem" ajax_not = "UF_ANNOUNCE" type="checkbox" id="notif-7" name="checkbox" 
                                value="Анонс готовности отретушированных фотографий" <?= $note['UF_ANNOUNCE'] == 1 ? 'checked' : ''?>>
                                <label for="notif-7"><span>Анонс готовности отретушированных фотографий</span></label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- обращения -->
                <div class="personal__tab-content request-personal <?=$filterActive?>">
                    <input id="personal-request" type="radio" name="personal">
                    <button type="button" class="personal__back-link">
                        <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z" fill="#242424"/>
                        </svg>
                        <span>Назад</span>
                    </button>

                    <div class="personal__tab-content_box request active">
                        <div class="personal__tab-header">
                            <div class="personal__title-box">
                                <p class="personal__title title">
                                    <span>обращения</span>
                                </p>
                            </div>
                        </div>
                        <div class="request-personal__content">
                            <a href="#!" class="request__new-request-link link">
                                <span>создать обращение</span>
                            </a>
                            <ul class="request_list">
                                <?foreach($requests as $item){?>
                                    <li class="request_item">
                                        <div class="request_item__table">
                                            <div class="request_item__table_item">
                                                <p>№ заявки<span class="colon">:</span></p>
                                                <p class="req_num"><?=$item['PROPERTY_REQUEST_NUM_VALUE']?></p>
                                            </div>
        
                                            <div class="request_item__table_item">
                                                <p>№ заказа<span class="colon">:</span></p>
                                                <p><?=$item['PROPERTY_ORDER_ID_VALUE']?></p>
                                            </div>
        
                                            <div class="request_item__table_item">
                                                <p>дата<span class="colon">:</span></p>
                                                <p><?=ConvertDateTime($item['PROPERTY_DATE_VALUE'], "DD/MM/Y", "ru");?></p>
                                            </div>
        
                                            <div class="request_item__table_item">
                                                <p>проблема<span class="colon">:</span></p>
                                                <p><?=$item['PROPERTY_SUBJECT_NAME']?></p>
                                            </div>
        
                                            <div class="request_item__table_item">
                                                <p>статус<span class="colon">:</span></p>
                                                <p><?=$item['PROPERTY_STATUS_VALUE']?></p>
                                            </div>
                                        </div>
                                        
                                        <a href="#!" class="request_item__chat-link link open-chat" data-id="<?=$item['PROPERTY_CHAT_ID_VALUE']?>">
                                            <span>перейти в чат</span>
                                        </a>
                                        
                                    </li>
                                <?}?>
                            </ul>
                        </div>
                    </div>

                    <div class="personal__tab-content_box request-create">

                        <button class="link request-back-link">
                            <svg viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z" fill="#242424"/>
                            </svg>
                            <span>Назад</span>
                        </button>

                        <div class="request-create_progress">
                            <div class="progress-line"></div>
                            <div class="progress-numbers">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                            </div>

                        </div>

                        <div class="personal__tab-header">
                            <div class="personal__title-box">
                                <p class="personal__title title">
                                    <span>создание обращения</span>
                                </p>
                            </div>
                        </div>

                        <div class="request-create__steps">

                        <!-- step 1 -->
                        <div class="request-personal__content request-create__step-1 active">
                            <div class="request-create_dropdown open">
                                <span class="request-create_dropdown__desc">Выберите категорию проблемы из списка</span>
                                <div class="request-create_dropdown__title">
                                    <span>Проблемы</span>
                                    <svg viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 8L7.5 2L14 8" stroke="#242424" stroke-width="2"/>
                                    </svg> 
                                </div>
                                <ul class="request-create_dropdown__list">
                                    <?foreach($problems as $problem){?>
                                        <li data-section="<?=$problem['ID']?>"><?=$problem['NAME']?></li>
                                    <?}?>
                                </ul>
                            </div>
                            <a href="#!" class="request__create-request-link link load__problems">
                                <span>создать</span>
                            </a>
                        </div>

                        <!-- step 2 -->
                        <div class="request-personal__content request-create__step-2">
                            <div class="request-create_order-num">
                                <div class="request-create_order-num__desc">Введите номер заказа</div>
                                <div class="request-create_order-num__input">
                                    <input type="number" name="ORDER_ID" placeholder="Например: 551">
                                </div>
                                
                            </div>

                            <div class="request-create_dropdown">
                                <span class="request-create_dropdown__desc">Выберите проблему из списка</span>
                                <div class="request-create_dropdown__title">
                                    <span>Проблемы</span>
                                    <svg viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 8L7.5 2L14 8" stroke="#242424" stroke-width="2"/>
                                    </svg> 
                                </div>
                                <ul class="request-create_dropdown__list">
                                    
                                </ul>
                            </div>
                            <form id="chat_creation-file" action="javascript:void(0);">
                                <div class="request-create_add-pic">
                                    <div class="request-create_add-pic__desc">Загрузите фото (при желании)</div>
                                    <label class="add-file-input">
                                        <input type="file" name="CHAT_FILE">
                                        <span>загрузить</span>
                                    </label>
                                </div>
                            </form>
                            <a href="#!" class="request__request-next-link link create-chat" data-user="<?=$idUser?>">
                                <span>далее</span>
                            </a>
                        </div>
                        </div>
                    </div>
                    <div class="personal__tab-content_box chat">
                        <button class="link request-back-link">
                            <svg viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z" fill="#242424"/>
                            </svg>
                            <span>Назад</span>
                        </button>

                        <div class="personal__tab-header">
                            <div class="personal__title-box">
                                <p class="personal__title title">
                                    <span>обращения</span>
                                </p>
                            </div>
                            <span class="request-num">Заявка</span>
                        </div>
                        <div class="request-personal__content">
                            <form id="chat-form" action="javascript:void(0);">
                                <div class="chat__container">
                                    <div class="chat__msgs">
                                        
                                    </div>
                                    <div class="chat__bottom">
                                        <div class="chat__input">
                                            <input type="text" name="MESSAGE" placeholder="Введите сообщение">
                                        </div>
                                        <div class="chat__btns">
                                            <label class="chat__add-file">
                                                <input type="file" name="FILE">
                                                <svg viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.8661 0.00430071C13.0841 0.0431422 12.3084 0.34698 11.6648 0.988116L0.826609 11.7854C0.171391 12.4381 -0.0677748 13.246 0.0161528 13.9986C0.100123 14.7512 0.482544 15.4482 1.02012 15.9837C1.55761 16.5193 2.2573 16.9002 3.01274 16.9839C3.76825 17.0676 4.57917 16.8292 5.23435 16.1766L14.5243 6.92186C15.4103 6.0391 15.3449 4.89067 14.7178 4.26593C14.0908 3.64127 12.9379 3.57599 12.0518 4.45871L5.85864 10.6284L6.39571 11.1635L12.589 4.9937C13.2512 4.33395 13.8402 4.46152 14.1808 4.80084C14.5215 5.1402 14.6496 5.72698 13.9872 6.38674L4.69741 15.6414C4.19139 16.1455 3.64757 16.2929 3.0967 16.2319C2.5458 16.171 1.98738 15.8771 1.55719 15.4487C1.12704 15.0201 0.832179 14.4637 0.770995 13.915C0.709811 13.3661 0.857665 12.8244 1.36368 12.3203L12.2019 1.52315C12.8921 0.835524 13.6861 0.657081 14.5192 0.797188C15.3524 0.937336 16.2124 1.42605 16.8904 2.10157C17.5685 2.77701 18.0591 3.63379 18.1997 4.46379C18.3404 5.29384 18.1613 6.08471 17.471 6.77242L8.18118 16.0271L8.71817 16.5621L18.0081 7.30733C18.8662 6.45253 19.1225 5.36358 18.9486 4.33781C18.7749 3.31205 18.201 2.3371 17.4275 1.56653C16.654 0.795926 15.6754 0.224318 14.6457 0.0511291C14.3883 0.00783185 14.1269 -0.00864644 13.8662 0.00430071H13.8661Z" fill="#242424"/>
                                                </svg>                                                
                                            </label>
                                            <button class="chat__send chat-send__ajax" data-chat="">
                                                <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18.7033 0.298057C18.5645 0.159317 18.3886 0.0636461 18.1967 0.0225611C18.0048 -0.0185239 17.8052 -0.0032711 17.6218 0.0664833L0.655874 6.48821H0.652481C0.456862 6.56345 0.289238 6.69724 0.172502 6.87131C0.0557659 7.04539 -0.00439032 7.25126 0.000249567 7.4608C0.00488946 7.67034 0.0740992 7.87335 0.198426 8.04208C0.322753 8.21082 0.496135 8.33706 0.694893 8.40357L0.712282 8.40908L6.53539 10.8957C6.64897 10.9302 6.7696 10.9343 6.88525 10.9076C7.0009 10.8809 7.10752 10.8243 7.19447 10.7435L16.5403 2.03486C16.5681 2.00701 16.6012 1.98492 16.6376 1.96985C16.674 1.95478 16.713 1.94702 16.7523 1.94702C16.7917 1.94702 16.8307 1.95478 16.8671 1.96985C16.9035 1.98492 16.9366 2.00701 16.9644 2.03486C16.9922 2.06271 17.0143 2.09577 17.0294 2.13216C17.0445 2.16854 17.0522 2.20754 17.0522 2.24693C17.0522 2.28631 17.0445 2.32531 17.0294 2.36169C17.0143 2.39808 16.9922 2.43114 16.9644 2.45899L8.25561 11.8008C8.1748 11.8878 8.11822 11.9944 8.0915 12.1101C8.06478 12.2257 8.06887 12.3463 8.10335 12.4599L10.5908 18.2866C10.5933 18.2951 10.5959 18.3027 10.5988 18.3108C10.7346 18.7039 11.0781 18.9813 11.4933 19H11.5357C11.7453 19.0012 11.9505 18.9393 12.1244 18.8223C12.2984 18.7054 12.4331 18.5388 12.5112 18.3443L18.9319 1.38255C19.0026 1.19902 19.0187 0.998928 18.9781 0.806464C18.9375 0.614 18.8421 0.437412 18.7033 0.298057Z" fill="#242424"/>
                                                </svg> 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery-3.5.1.min.js"></script>
<script>
    $(document).ready(function() {
    console.log(123);
    // Обновляем чат раз в 5 секунд
    function updateChat()
    {
        if($(".chat-send__ajax").attr("data-chat")){
            $.ajax({
                'method': 'POST',
                'dataType': 'json',
                'url': '../ajax/OL1/ajax.php',
                'data': {'type': 'chat_history', 'CHAT_ID': $(".chat-send__ajax").data("chat")},
                success: function (data) {//success callback
                    console.log(data);
                    $(".chat__msgs").html(data.string);
                    //$('.chat__msgs').text('').html(data.string);
                }
            });
        }
    }
    setInterval(updateChat, 5000);
    updateChat();
    console.log(123);
    // Change event listener for checkbox inputs with class 'ajax_checkbox'
    $('.ajax_check.chk-all').change(function() {
        var chec = $(this).is(":checked")
        $('.ajax_checkItem').each(function() {
            $(this).prop('checked', chec);
        })
        let data = new FormData();
        data.append('ALL', $(this).is(":checked"))
        $.ajax({
            url: '/ajax/profile/notification.php',
            type: "POST",
            dataType : "json",
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            success: function (data) {
                console.log(data);
                console.log(true);
            },
            error:function(data){
                console.log(data);
                console.log(false);
                            }
        });
    })
    $('.ajax_checkItem').change(function() {
        let data = new FormData();
        data.append('ACTION', $(this).is(":checked"))
        data.append('NOTE',$(this).attr('ajax_not'))
        console.log(data)
        $.ajax({
            url: '/ajax/profile/notification.php',
            type: "POST",
            dataType : "json",
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            success: function (data) {
                console.log(data);
                console.log(true);
            },
            error:function(data){
                console.log(data);
                console.log(false);
                            }
        });
    })
})
</script>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>