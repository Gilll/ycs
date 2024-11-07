<!--modal feedback-->
<?
$footerContacts = CIBlockElement::GetList(
    array('SORT' => "ASC"),
    array('IBLOCK_ID' => 13, 'ACTIVE' => 'Y'),
    false,
    false,
    array('ID','NAME','PROPERTY_TELEGRAMM', 'PROPERTY_TELEGRAMM_M', 'PROPERTY_WHATSUP', 'PROPERTY_TELEFON', 'PROPERTY_POCHTA', 'PROPERTY_ADRESS', 'PROPERTY_Y_MAP')
)->GetNext();

$footerLinks = CIBlockElement::GetList(
    array('SORT' => "ASC"),
    array('IBLOCK_ID' => 15, 'ACTIVE' => 'Y'),
    false,
    false,
    array('ID','NAME','PROPERTY_SSYLKA','PROPERTY_COLUMN_PC','PROPERTY_COLUMN_MOBILE') 
);
while($footerElem = $footerLinks->GetNext()){
    $links[] = $footerElem;
}

?>
        <script
          src="https://code.jquery.com/jquery-3.6.3.js"
          integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM="
          crossorigin="anonymous">
        </script>
<div class="modal modal-login">
    <div class="modal-login__content">
        <p class="modal-login__title">войти</p>
        <form class="modal-login__form" id='auth_form'>
            <div class="modal-login__label-box">
                <p class="modal-login__name">
                    введите e-mail
                </p>
                <label class="modal-login__label">
                    <input placeholder="Например: viktoria12344@ya.ru" type="email" class="modal-login__input" required="" name="EMAIL">
                </label>
            </div>
            <div class="modal-login__label-box">
                <p class="modal-login__name">
                    введите пароль
                </p>
                <label class="modal-login__label">
                    <input type="password" class="modal-login__input" required="" name="PASSWORD">
                </label>
            </div>
            <div class="modal-login__footer">
                <button type="submit" class="modal-login__submit link">войти</button>
                <button type="button" class="modal-login__register-btn">регистрация</button>
            </div>
        </form>
        <a href="#!" class="modal-login__restore"> забыли пароль? </a>
        <p class="modal-login__error-login-text">
            неверный логин или пароль
        </p>
    </div>
    <button type="button" class="modal__close" data-fancybox-close></button>
</div>

<div class="modal modal-registration">
    <p class="modal-registration__title">регистрация</p>
    <form class="modal-registration__form" id="register_form">
        <div class="modal-registration__label-box">
            <p class="modal-registration__name">введите имя</p>
            <label class="modal-registration__label">
                <input 
                    placeholder="Например: Виктория" 
                    type="text" 
                    class="modal-registration__input register_name" 
                    name="NAME" 
                    required />
            </label>
            <p class="modal-registration__label-error-text">Ошибка</p>
        </div>
        <div class="modal-registration__label-box">
            <p class="modal-registration__name">введите e-mail</p>
            <label class="modal-registration__label">
                <input 
                    placeholder="Например: viktoria12344@ya.ru" 
                    type="email" 
                    class="modal-registration__input email register_email"
                    name="EMAIL"
                    required />
            </label>
            <p class="modal-registration__label-error-text">Такой e-mail уже существует</p>
        </div>
        <div class="modal-registration__label-box">
            <p class="modal-registration__name">введите пароль</p>
            <label class="modal-registration__label">
                <input 
                    type="password" 
                    class="modal-registration__input register_password" 
                    name="PASSWORD"
                    required />
            </label>
            <p class="modal-registration__label-error-text">Ошибка</p>
        </div>

        <div class="modal-registration__checkbox-wrap">
            <label class="modal-registration__checkbox-label">
                <input type="checkbox" checked />
                <span class="modal-registration__checkbox-icon">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 9.70005L0 5.70005L1.4 4.30005L4 6.90005L10.6 0.300049L12 1.70005L4 9.70005Z" fill="#242424" />
                    </svg>
                </span>
            </label>
            <span class="modal-registration__checkbox-text"> Подтверждаю, что я ознакомлен и согласен с&nbsp;<a href="">условиями политики конфиденциальности</a> </span>
        </div>

        <div class="modal-registration__footer">
            <button type="submit" class="modal-registration__submit link reg-complete">зарегистрироваться</button>
            <button type="button" class="modal-registration__login-btn">войти</button>
        </div>
    </form>

    <button class="modal__close"></button>
</div>

<div class="modal modal-feedback">
    <p class="feedback__sub-title desktop">мы подберем для вас удобную дату съемок</p>
    <p class="feedback__title">Оставьте заявку</p>
    <p class="feedback__text">НАШ МЕНЕДЖЕР ПЕРЕЗВОНИТ ВАМ, ЧТОБЫ ОБСУДИТЬ СТОИМОСТЬ И УСЛОВИЯ СЪЁМКИ</p>
    <form class="feedback__form">
        <div class="feedback__form-item">
            <p class="feedback__form-name">введите имя</p>
            <label class="feedback__form-label">
                <input placeholder="Например: Алексей" type="text" name="NAME" class="feedback__input" required />
            </label>
        </div>
        <div class="feedback__form-item">
            <p class="feedback__form-name">введите номер телефона</p>
            <label class="feedback__form-label">
                <input placeholder="+ 7" type="text" name="PHONE_NUMBER" class="feedback__input phone" required />
            </label>
        </div>
        <button type="submit" class="feedback__submit link feedback-complete">
            <span>отправить</span>
        </button>
    </form>
    <button type="button" class="modal__close"></button>
</div>

<!-- <div class="modal modal-feedback">
    <p class="feedback__sub-title desktop">
        мы подберем для вас удобную дату съемок
    </p>
    <p class="feedback__title">
        Оставьте заявку
    </p>
    <p class="feedback__text">
        НАШ МЕНЕДЖЕР ПЕРЕЗВОНИТ ВАМ, ЧТОБЫ ОБСУДИТЬ СТОИМОСТЬ И УСЛОВИЯ СЪЁМКИ
    </p>
    <form class="feedback__form">
        <div class="feedback__form-item">
            <p class="feedback__form-name">
                введите имя
            </p>
            <label class="feedback__form-label">
                <input placeholder="Например: Алексей" type="text" class="feedback__input" name="NAME" required>
            </label>
        </div>
        <div class="feedback__form-item">
            <p class="feedback__form-name">
                введите номер телефона
            </p>
            <label class="feedback__form-label">
                <input placeholder="+ 7" type="text" class="feedback__input mask-phone" name="PHONE_NUMBER" required>
            </label>
        </div>
        <button type="submit" class="feedback__submit link feedback-complete">
            <span>отправить</span>
        </button>
    </form>
    <button type="button" class="modal__close" data-fancybox-close></button>
</div> -->

<div class="modal modal-fb-complete">
    <p class="feedback__title">
        Заявка отправлена
    </p>
    <p class="feedback__text">
        В скоро времени с вами свяжется наш менеджер
    </p>
    <a href="/" class="feedback__submit link">
        <span>перейти на главную</span>
    </a>
</div>

<div class="restore-modal">
    <div class="restore-modal__container">
        <div class="restore-modal__close"></div>
        <div class="restore-modal__title">
            <span>Восстановление</span>
            <strong>Восстановить пароль</strong>
        </div>
        <form action="" class="restore-modal__form">
            <label for="">введите e-mail</label>
            <input type="text" placeholder="email" name="EMAIL" required>
            <button class="link" type="submit"><span>Восстановить</span></button>
        </form>
    </div>
</div>

<div class="tt-modal">
    <div class="tt-modal__container">
        <div class="tt-modal__close"></div>
        <div class="tt-modal__content">
            <div class="cancellation-modal__title ajax_title">ваше ТЗ успешно загружено</div>
            
        </div>
       
    </div>
</div>

<!-- reg complete -->
<div class="modal modal-reg-complete">
    <p class="modal-reg-complete__sub-title">Поздравляем!</p>
    <p class="modal-reg-complete__title">вы зарегистрированы</p>
    <p class="modal-reg-complete__text">Теперь вы можете заполнить профиль в личном кабинете или перейти на главную страницу.</p>
    <div class="modal-reg-complete__buttons">
        <a href="/" class="feedback__submit link">
            <span>перейти на главную</span>
        </a>
        <a href="/cabinet/" class="feedback__link"> в личный кабинет </a>
    </div>
    <button type="button" class="modal__close"></button>
</div>


<!-- <div class="cancellation-modal">
    <div class="cancellation-modal__container">
        <div class="cancellation-modal__close"></div>
        <div class="cancellation-modal__content">
            <div class="cancellation-modal__title">Вы уверены, что хотите отменить заказ?</div>
            <button class="cancellation-modal__link link"><span>отменить</span></button>
        </div>
       
    </div>
</div> -->
<div class="background-blur"></div>
<footer class="footer">
    <div class="container">
        <div class="footer__wrapper">
            <div class="footer__left">
                <nav class="footer__nav-desk">
                    <ul>
                        <?foreach($links as $link){
                            if($link['PROPERTY_COLUMN_PC_VALUE'] == 1){?>
                                <li><a href="<?=$link['PROPERTY_SSYLKA_VALUE']?>"><?=$link['NAME']?></a></li>
                            <?}?>
                        <?}?>
                    </ul>
                    <ul>
                        <?foreach($links as $link){
                            if($link['PROPERTY_COLUMN_PC_VALUE'] == 2){?>
                                <li><a href="<?=$link['PROPERTY_SSYLKA_VALUE']?>"><?=$link['NAME']?></a></li>
                            <?}?>
                        <?}?>
                    </ul>
                    <ul>
                        <?foreach($links as $link){
                            if($link['PROPERTY_COLUMN_PC_VALUE'] == 3){?>
                                <li><a href="<?=$link['PROPERTY_SSYLKA_VALUE']?>"><?=$link['NAME']?></a></li>
                            <?}?>
                        <?}?>
                    </ul>
                    <ul>
                        <?foreach($links as $link){
                            if($link['PROPERTY_COLUMN_PC_VALUE'] == 4){?>
                                <li><a href="<?=$link['PROPERTY_SSYLKA_VALUE']?>"><?=$link['NAME']?></a></li>
                            <?}?>
                        <?}?>
                    </ul>
                </nav>
                <nav class="footer__nav-mobile">
                    <ul>
                        <?foreach($links as $link){
                            if($link['PROPERTY_COLUMN_MOBILE_VALUE'] == 1){?>
                                <li><a href="<?=$link['PROPERTY_SSYLKA_VALUE']?>"><?=$link['NAME']?></a></li>
                            <?}?>
                        <?}?>
                    </ul>
                    <ul>
                        <?foreach($links as $link){
                            if($link['PROPERTY_COLUMN_MOBILE_VALUE'] == 2){?>
                                <li><a href="<?=$link['PROPERTY_SSYLKA_VALUE']?>"><?=$link['NAME']?></a></li>
                            <?}?>
                        <?}?>
                    </ul>
                </nav>
            </div>
            <!-- left -->
            <div class="footer__right">
                <div class="footer__right-inf">
                    <span>телефон</span>
                    <a href="tel:<?=$footerContacts['PROPERTY_TELEFON_VALUE']?>"><?=$footerContacts['PROPERTY_TELEFON_VALUE']?></a>
                </div>
                <div class="footer__right-inf">
                    <span>E-mail</span>
                    <a href="mailto:<?=$footerContacts['PROPERTY_POCHTA_VALUE']?>"><?=$footerContacts['PROPERTY_POCHTA_VALUE']?></a>
                </div>
            
                <div class="footer__social">
                    <a href="https://wa.me/<?=$footerContacts['PROPERTY_WHATSUP_VALUE']?>" target="_blank">
                        <img src="<?=SITE_TEMPLATE_PATH?>/img/icon/whatt.svg" alt="">
                    </a>
                    <a href="<?=$footerContacts['PROPERTY_TELEGRAMM_VALUE']?>" target="_blank">
                        <img src="<?=SITE_TEMPLATE_PATH?>/img/icon/teleg.svg" alt="">
                    </a>
                    <a href="mailto:<?=$footerContacts['PROPERTY_POCHTA_VALUE']?>">
                    <img src="<?=SITE_TEMPLATE_PATH?>/img/icon/picture.svg" alt="">
                            
                    </a>
                  
                </div>
            </div>
            <div class="footer__end">
                <ul class="footer__end-lists">
                <li>ИП Лешванова Екатерина Сергеевна </li>
                <li>ИНН 50110646590010:06</li>
                <li>ОГРНИП: 317502200035150</li>
                <li>Номер счета: 40802810001500111326</li>
                <li>ООО "Банк Точка"</li>
                <li>БИК: 044525104</li>
                <li>Кор. Счет: 30101810745374525104</li>
                </ul>
            </div>
        </div>
        <?
            $files = CIBlockElement::GetList(
                array("SORT"=>"ASC"),
                array('IBLOCK_ID' => 29, 'ACTIVE' => 'Y'),
                false,
                array("nTopCount" => 1),
                array('ID', 'PROPERTY_POLITIKA_CONF')
            )->GetNext();
        ?>
        <div class="footer__policy">
            <span>Your Choise Studio @2019</span>
            <span> <a target="_blank" href="<?=CFile::GetPath($files['PROPERTY_POLITIKA_CONF_VALUE'])?>"> Политика конфиденциальности</a>
            </span>
        </div>
    </div>
</footer>

<script src="https://api-maps.yandex.ru/2.1/?apikey=5851e0c4-507c-49d2-8456-0b3bc881f9f3&lang=ru_RU"></script>

<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery-3.5.1.min.js"></script>
<script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/swiper-bundle.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/air-datepicker.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/Jq-script.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/main.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/homerion.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.maskedinput.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.fancybox.min.js"></script>

<script src="<?=SITE_TEMPLATE_PATH?>/js/dev.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/dev2.js"></script>

<script src="<?=SITE_TEMPLATE_PATH?>/js/profile.js"></script>

<script src="<?=SITE_TEMPLATE_PATH?>/js/orders.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/new.js"></script>

<script src="<?=SITE_TEMPLATE_PATH?>/js/profile/2.a3f82278.chunk.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/profile/main.f2ae0235.chunk.js"></script>
<script>
// $(document).ready( function () {
//     console.log(1)
//       $('main').on("click", ".ajax___like", function(){
//         console.log(1)
//       let par = this.parentElement;
//       console.log($(this).attr("ajax_id"))
//       console.log($(this))
//       var data = new FormData();
//         data.append('ACT', $(this).hasClass('active'));
//         data.append('NAME', $(this).attr("ajax_id"));
//         $.ajax({
//             url: '/ajax/profile/favour.php',
//             type: "POST",
//             dataType : "json",
//             cache: false,
//             contentType: false,
//             processData: false,
//             data: data,
//             success: function (data) {
//                 console.log(data);
//                 console.log(true);
//             },
//             error:function(data){
//                 console.log(data);
//                 console.log(false);
//                             }
//         });
//     });
//     $('.ajax_check.chk-all').change(function() {
//         var chec = $(this).is(":checked")
//         $('.ajax_checkItem').each(function() {
//             $(this).prop('checked', chec);
//         })
//         let data = new FormData();
//         data.append('ALL', $(this).is(":checked"))
//         $.ajax({
//             url: '/ajax/profile/notification.php',
//             type: "POST",
//             dataType : "json",
//             cache: false,
//             contentType: false,
//             processData: false,
//             data: data,
//             success: function (data) {
//                 console.log(data);
//                 console.log(true);
//             },
//             error:function(data){
//                 console.log(data);
//                 console.log(false);
//                             }
//         });
//     })
//     $('.ajax_checkItem').change(function() {
//         let data = new FormData();
//         data.append('ACTION', $(this).is(":checked"))
//         data.append('NOTE',$(this).attr('ajax_not'))
//         console.log(data)
//         $.ajax({
//             url: '/ajax/profile/notification.php',
//             type: "POST",
//             dataType : "json",
//             cache: false,
//             contentType: false,
//             processData: false,
//             data: data,
//             success: function (data) {
//                 console.log(data);
//                 console.log(true);
//             },
//             error:function(data){
//                 console.log(data);
//                 console.log(false);
//                             }
//         });
//     })
//     $('.record__custom-checkbox.ajax').change(function() {
//         let data = new FormData();
//         data.append('ACTION', $(this).is(":checked"))
//         data.append('NOTE',$(this).attr('ajax_check'))
//         data.append('ID',$(this).attr('ajax__id'))
//         console.log(data)
//         $.ajax({
//             url: '/ajax/profile/notification.php',
//             type: "POST",
//             dataType : "json",
//             cache: false,
//             contentType: false,
//             processData: false,
//             data: data,
//             success: function (data) {
//                 console.log(data);
//                 console.log(true);
//             },
//             error:function(data){
//                 console.log(data);
//                 console.log(false);
//                             }
//         });
//     })
// })
// ymaps.ready(function () {
//   var myMap = new ymaps.Map('map', {
//           center: [<?=$footerContacts['PROPERTY_Y_MAP_VALUE']?>],
//           zoom: 17
//       }, {
//           searchControlProvider: 'yandex#search'
//       }),

//       // Создаём макет содержимого.
//       MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
//           '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
//       ),

//       myPlacemark = new ymaps.Placemark([<?=$footerContacts['PROPERTY_Y_MAP_VALUE']?>], {
//           hintContent: '<?=$footerContacts['~PROPERTY_ADRESS_VALUE']?>',
//           //balloonContent: 'Это красивая метка'
//       }, {
//           // Опции.
//           // Необходимо указать данный тип макета.
//           iconLayout: 'default#image',
//           // Своё изображение иконки метки.
//           //iconImageHref: 'images/myIcon.gif',
//           // Размеры метки.
//           iconImageSize: [48, 48],
//           // Смещение левого верхнего угла иконки относительно
//           // её "ножки" (точки привязки).
//           iconImageOffset: [-5, -38]
//       });

//       /*myPlacemarkWithContent = new ymaps.Placemark([<?=$footerContacts['PROPERTY_Y_MAP_VALUE']?>], {
//           hintContent: '<?=$footerContacts['PROPERTY_ADRESS_VALUE']?>',
//           balloonContent: 'А эта — новогодняя',
//           //iconContent: '12'
//       }, {
//           // Опции.
//           // Необходимо указать данный тип макета.
//           iconLayout: 'default#imageWithContent',
//           // Своё изображение иконки метки.
//           //iconImageHref: 'images/ball.png',
//           // Размеры метки.
//           iconImageSize: [48, 48],
//           // Смещение левого верхнего угла иконки относительно
//           // её "ножки" (точки привязки).
//           iconImageOffset: [-24, -24],
//           // Смещение слоя с содержимым относительно слоя с картинкой.
//           iconContentOffset: [15, 15],
//           // Макет содержимого.
//           iconContentLayout: MyIconContentLayout
//       });*/

//   myMap.geoObjects
//       .add(myPlacemark)
//       //.add(myPlacemarkWithContent);
// });
</script>
<?
//$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH . "/js/jquery-3.5.1.min.js");
//$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH . "/js/jquery.fancybox.min.js");

?>


<div style="display: none;">
hinde xxx hd video <a href="https://tubanator.com" rel="dofollow" target="_self" title="tubanator.com hd japanese porn">tubanator.com</a> sxeviedo
xmxx..com <a href="https://tubzolina.mobi" title="tubzolina.mobi">tubzolina.mobi</a> aurat nangi
tamlixnxx <a href="https://greenporn.mobi" rel="dofollow" title="greenporn.mobi">greenporn.mobi</a> www six girl com
افلام لحس الكس <a href="https://porno-galleras.com/" rel="dofollow" target="_self" title="porno-galleras.com">porno-galleras.com</a> بنتين بينيكو بعض
xnxx arabian <a href="https://ganstavideos.info" target="_blank">ganstavideos.info</a> telugu sex play videos
</div>
<div style="display: none;">
www sexy bp <a href="https://tubefury.mobi" target="_blank" title="tubefury.mobi cash porn video tube">tubefury.mobi</a> tamil clips age com
سكسفرى <a href="https://pornoshock.org/" target="_self">pornoshock.org</a> شذوذ بنات
rias gremory hentai <a href="https://www.stophentai.com/" target="_blank" title="stophentai.com">stophentai.com</a> laurie's bogan ghost story
صورسكس نيك <a href="https://arabgrid.net/" target="_blank">arabgrid.net</a> سكس حوادث
افلام اباحيه مصريه <a href="https://www.arabicaporn.com/" rel="dofollow" title="arabicaporn.com">arabicaporn.com</a> افلام سكس كارينا كابور
</div>
<div style="display: none;">
tanakana <a href="https://www.hentai24x7.com/" rel="dofollow" target="_self" title="hentai24x7.com taboo 9">hentai24x7.com</a> sorceress hentai
ながせあい <a href="https://javsite.mobi/" rel="dofollow" title="javsite.mobi 真・性欲、覚醒 無碼流出 横山美雪">javsite.mobi</a> 黒ギャル 爆乳
farah karimaee hot <a href="https://mybeegsex.mobi" target="_self" title="mybeegsex.mobi">mybeegsex.mobi</a> shubhangi atre hot
abot kamay na pangarap feb 17 2023 <a href="https://pinoywebtv.com/" target="_self">pinoywebtv.com</a> mano po legacy episode 1
kannad xxx com <a href="https://fuckzilla.mobi" title="fuckzilla.mobi">fuckzilla.mobi</a> sxx vidoe
</div>
	
</body>

</html>