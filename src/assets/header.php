<?
CModule::IncludeModule('iblock');
$curPage = $APPLICATION->GetCurPage();
global $USER;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title><?= $APPLICATION->ShowTitle() ?></title>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>
    <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
    <link href="https://cdn.jsdelivr.net/npm/air-datepicker@3.5.0/air-datepicker.min.css" rel="stylesheet" />
    <?  
        $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH . "/css/style.min.css");
        // $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH . "/css/air-datepicker.css");
        $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH . "/css/jquery.fancybox.min.css");
        $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH . "/css/style-new.css");
        $APPLICATION->ShowHead();
        
        
    ?>
    
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<?
$headerContacts = CIBlockElement::GetList(
    array('SORT' => "ASC"),
    array('IBLOCK_ID' => 13, 'ACTIVE' => 'Y'),
    false,
    false,
    array('ID', 'PROPERTY_TELEFON', 'PROPERTY_WHATSUP')
)->GetNext();

$arHeader = CIBlockElement::GetList(
    array("SORT"=>"ASC"),
    array('IBLOCK_ID' => 14, 'ACTIVE' => 'Y'),
    false,
    false,
    array('ID','NAME', 'PROPERTY_SSYLKA')
);
while($headerElem = $arHeader->GetNext()){
    $headers[] = $headerElem;
}?>
<body>
    <?
    /*if(($curPage == '/about/')||($curPage == '/kontakty/')||($curPage == '/modeli/')||($curPage == '/cabinet/')||($curPage == '/record-shooting/')||(true == strpos($curPage, 'record-shooting/'))||($curPage == '/blog/')||($curPage == '/portfolio/')||(true == strpos($curPage, 'model/'))||(true == strpos($curPage, 'portfolio/'))||(true == strpos($curPage, 'statia/'))||($curPage == '/mannequin/')||($curPage == '/predmetnaya-semka/')){*/
        if(($curPage == '/sbornaya_semka/')||($curPage == '/')){
    ?>
        <header class="header">
    <?} else {?>
	   <header class="header  header--two">
    <?}?>
        <div id="panel"><?=$APPLICATION->ShowPanel(); ?></div>
        <div class="container">
            <div class="header__wrapper">
                <div class="header__burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <a href="/" class="header__logo">
                    <svg  viewBox="0 0 94 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.90326 61.0152C2.84764 60.9732 2.77813 60.8333 2.76422 60.8053C2.76422 60.7913 2.79203 60.7353 2.80593 60.7353C2.94497 60.7493 3.08401 60.7773 3.37599 60.7773C3.807 60.7773 4.07117 60.7073 4.34925 60.5534C4.98882 60.1616 5.16957 59.5179 5.15566 58.6783C5.15566 57.391 4.5578 56.3555 2.90326 56.3555C2.76422 56.3555 2.48615 56.3695 2.38882 56.4115C2.34711 56.4255 2.3054 56.4954 2.29149 56.5934C2.27759 56.9292 2.24978 58.0207 2.24978 59.8957C2.24978 60.7493 2.22198 62.4285 2.26369 63.464C2.27759 64.1496 2.38882 64.2476 2.79203 64.3316C2.98668 64.3735 3.23695 64.4015 3.45941 64.4295C3.51502 64.4575 3.50112 64.6394 3.47331 64.6534C3.12572 64.6534 2.29149 64.6114 1.73535 64.6114C1.10968 64.6114 0.372779 64.6534 0.0390888 64.6534C-0.00262241 64.6254 -0.0165261 64.4575 0.0251851 64.4295C0.275452 64.4015 0.511816 64.3735 0.678661 64.3316C0.970639 64.2616 1.10968 64.2336 1.13748 63.52C1.16529 63.0722 1.1931 62.2046 1.1931 60.2036C1.1931 59.1681 1.1931 57.5729 1.16529 57.1391C1.15139 56.6773 1.09577 56.4395 0.748179 56.3555C0.567431 56.3135 0.358875 56.2715 0.0808 56.2436C0.0668963 56.2156 0.0808 56.0476 0.108608 56.0337C0.372779 56.0337 1.04016 56.0756 1.67973 56.0756C2.40272 56.0756 2.93107 56.0476 3.69577 56.0476C4.1546 56.0476 4.94711 56.1456 5.46155 56.5374C5.90647 56.8872 6.29577 57.4609 6.30967 58.3565C6.32358 59.6019 5.6423 60.3715 4.9332 60.7353C4.47438 60.9732 4.04337 61.0852 3.51502 61.0852C3.29256 61.0852 3.0562 61.0712 2.90326 61.0152ZM8.01369 56.2428C7.98594 56.2147 7.99982 56.0465 8.02757 56.0325C8.36056 56.0325 9.06816 56.0745 9.45665 56.0745C10.3169 56.0745 10.9551 56.0465 11.6072 56.0465C13.1889 56.0465 13.8426 56.9999 13.8426 58.1777C13.8426 59.3695 13.0296 60.0411 12.2249 60.3776C12.8529 61.8399 15.1461 65.2434 18.5077 66.9901C17.6076 67.099 16.3632 66.282 15.6656 65.8349C14.968 65.3878 12.7719 63.6284 11.2881 60.7295C11.0938 60.7155 10.414 60.7295 10.2336 60.7295C10.2059 60.7295 10.1781 60.7856 10.1781 60.8136C10.1781 61.5988 10.1781 62.9869 10.2059 63.5618C10.2197 64.1507 10.3169 64.2488 10.5805 64.3189C10.7886 64.375 11.0106 64.403 11.2881 64.4451C11.3297 64.4872 11.3158 64.6274 11.2742 64.6694C11.0522 64.6694 10.3169 64.6274 9.63702 64.6274C8.70742 64.6274 8.22181 64.6694 8.02757 64.6694C7.97207 64.6554 7.97207 64.4732 8.02757 64.4591C8.30506 64.4171 8.52705 64.389 8.6658 64.347C8.98491 64.2628 9.06816 64.0806 9.09591 63.5618C9.10978 63.1692 9.12366 61.1081 9.12366 60.3369C9.12366 59.4115 9.12366 57.5327 9.09591 56.9719C9.08203 56.6073 8.98491 56.397 8.65192 56.3409C8.48543 56.2989 8.23569 56.2568 8.01369 56.2428ZM10.8101 56.4106C10.6752 56.4106 10.4804 56.4241 10.3605 56.4644C10.3155 56.4779 10.2856 56.572 10.2856 56.6258C10.2406 57.0158 10.2406 58.8179 10.2406 60.1089C10.2406 60.1358 10.2856 60.1761 10.3005 60.1761C10.84 60.2299 11.5165 60.1455 11.8912 60.0111C12.3557 59.8497 12.871 59.4182 12.871 58.3154C12.871 57.0782 12.3835 56.4106 10.8101 56.4106ZM21.3189 64.8633C20.0814 64.8633 18.9552 64.3316 18.2601 63.5619C17.4397 62.6524 17.0782 61.435 17.0782 60.2736C17.0782 59.2661 17.3702 58.3845 17.8429 57.6708C18.6216 56.5374 20.1093 55.8238 21.5274 55.8238C24.2943 55.8238 25.7264 57.8807 25.7264 60.1896C25.7264 61.337 25.4483 62.2326 24.906 63.0302C24.0996 64.2336 22.7093 64.8633 21.3189 64.8633ZM21.8333 64.4295C22.4451 64.4295 23.0012 64.2336 23.3766 63.8978C24.2387 63.1561 24.5584 61.9387 24.5584 60.6374C24.5584 59.2101 24.0857 57.6568 22.9595 56.8313C22.459 56.4395 21.8472 56.2156 21.0964 56.2156C20.582 56.2156 20.1371 56.3555 19.7617 56.5654C18.7467 57.1951 18.3018 58.5104 18.3018 59.9517C18.3018 61.351 18.8023 63.0302 20.0397 63.8978C20.5125 64.2336 21.1103 64.4295 21.8333 64.4295ZM28.0941 56.2436C28.0802 56.2156 28.0941 56.0476 28.1219 56.0337C28.4556 56.0476 29.3594 56.0756 29.7209 56.0756C30.6385 56.0756 31.2503 56.0197 32.3348 56.0197C33.5305 56.0197 34.5455 56.3275 35.2824 56.9712C36.1722 57.7548 36.5754 58.8742 36.5754 60.1476C36.5754 62.0647 35.63 63.2121 34.7401 63.8138C33.8503 64.4295 32.8492 64.7094 31.6118 64.7094C30.7776 64.7094 30.2353 64.6674 28.9979 64.6534C28.8588 64.6534 28.2749 64.6394 27.9968 64.6534C27.9551 64.6394 27.9551 64.4435 27.9968 64.4295C28.2888 64.4015 28.553 64.3735 28.7615 64.3036C28.984 64.2336 29.1508 64.1496 29.1925 63.6179C29.2342 62.7643 29.2342 61.491 29.2342 60.0916C29.2342 59.2241 29.2342 57.6429 29.2064 57.1251C29.1786 56.6074 29.123 56.4674 28.7893 56.3695C28.6086 56.3135 28.3861 56.2715 28.0941 56.2436ZM30.3326 63.52C30.3465 63.7019 30.4161 63.8978 30.6107 64.0237C30.9166 64.2336 31.5423 64.3176 32.2374 64.3176C32.9187 64.3176 33.6834 64.1496 34.2813 63.5479C34.9348 62.8763 35.3519 61.9667 35.3519 60.3715C35.3519 58.9722 34.907 57.7408 33.8086 56.9572C33.1829 56.5234 32.3209 56.3555 31.2225 56.3555C30.9305 56.3555 30.6107 56.3835 30.4856 56.4255C30.43 56.4674 30.3465 56.5234 30.3326 56.7193C30.3048 57.1251 30.3048 59.0282 30.3048 60.2596C30.3048 61.5609 30.3048 63.0722 30.3326 63.52ZM38.9432 56.2436C38.9015 56.2156 38.9154 56.0616 38.9432 56.0337C39.1517 56.0337 39.833 56.0756 40.5421 56.0756C41.2512 56.0756 41.7378 56.0337 42.0437 56.0337C42.0715 56.0616 42.0715 56.2156 42.0437 56.2436C41.7656 56.2995 41.6266 56.3135 41.4598 56.3695C41.2095 56.4395 41.1261 56.5794 41.0983 57.1391C41.0565 58.2306 41.0705 60.6934 41.0983 61.435C41.1539 62.4005 41.279 62.8623 41.5571 63.2681C41.9881 63.9397 42.8223 64.2896 43.7678 64.2896C45.0191 64.2896 46.0758 63.7998 46.187 61.6729C46.2426 60.6234 46.2705 58.8043 46.2148 57.377C46.2009 56.5374 45.9646 56.4255 45.6031 56.3415C45.4084 56.2995 45.2833 56.2995 45.0191 56.2575C44.9913 56.2296 45.0052 56.0756 45.033 56.0476C45.2555 56.0476 45.7143 56.0756 46.4929 56.0756C47.0769 56.0756 47.5079 56.0476 47.7582 56.0476C47.786 56.0756 47.786 56.2296 47.7582 56.2575C47.5496 56.2855 47.3688 56.3135 47.2437 56.3555C46.8961 56.4674 46.7988 56.6633 46.771 57.447C46.7154 60.4555 46.7154 61.295 46.5624 62.2046C46.2705 64.2336 44.8523 64.8633 43.3229 64.8633C41.279 64.8633 40.2501 63.9537 40.0555 62.3445C39.9443 61.477 39.986 58.2306 39.9582 57.1111C39.9582 56.7333 39.9164 56.4674 39.6106 56.3695C39.4576 56.3135 39.1378 56.2715 38.9432 56.2436ZM56.9805 58.1326C56.8553 57.0691 56.6746 56.7193 56.2019 56.4814C55.7152 56.2296 55.1591 56.1456 54.45 56.1456C52.4061 56.1456 51.1548 57.6289 51.1548 60.1336C51.1548 62.7363 52.5591 64.4435 54.9227 64.4435C55.3398 64.4435 56.0489 64.3875 56.5773 63.8838C56.9388 63.52 57.1751 63.1421 57.481 62.5964C57.5227 62.5824 57.6757 62.6524 57.6896 62.7084C57.5088 63.394 56.9666 64.4015 56.6468 64.5694C56.2436 64.6954 55.5067 64.8633 54.6446 64.8633C51.6553 64.8633 49.9035 63.2121 49.9035 60.2596C49.9035 58.7343 50.5708 57.279 52.0724 56.4674C52.8093 56.0616 53.727 55.8238 54.9227 55.8238C55.9377 55.8238 56.8414 56.0337 57.4949 56.0896C57.3976 56.4814 57.2585 57.5169 57.2446 58.1046C57.2029 58.1606 56.9805 58.1886 56.9805 58.1326ZM65.1322 64.4435C65.16 64.4715 65.1461 64.6394 65.1044 64.6534C64.6734 64.6534 63.9226 64.6114 63.3803 64.6114C62.4905 64.6114 61.8092 64.6534 61.406 64.6534C61.3643 64.5974 61.3643 64.4715 61.406 64.4435C61.8092 64.4015 62.1151 64.3595 62.2958 64.3176C62.699 64.2476 62.7546 63.9677 62.7825 63.3241C62.8103 62.7084 62.8242 58.8043 62.8242 56.5654C62.8242 56.5234 62.7686 56.4674 62.7407 56.4674C62.4766 56.4534 61.1001 56.4534 60.8081 56.4814C60.5579 56.4954 60.391 56.6214 60.252 56.8453C60.0712 57.1251 59.8905 57.6289 59.7375 58.0626C59.7097 58.0906 59.529 58.0627 59.5012 58.0207C59.6124 57.447 59.7236 56.4395 59.7514 55.8937C59.7514 55.8937 59.7932 55.8517 59.821 55.8657C60.0851 55.9917 60.5579 56.0756 60.9055 56.0756H66.022C66.5226 56.0756 66.8145 56.0476 67.2456 55.9077C67.2595 55.9077 67.3012 55.9217 67.3012 55.9357C67.176 56.3555 67.0787 57.293 67.0231 58.0347C67.0092 58.0766 66.7867 58.0766 66.7728 58.0347C66.745 57.6708 66.6755 57.1811 66.5643 56.9012C66.453 56.6354 66.3001 56.5234 66.022 56.4954C65.5076 56.4674 64.2702 56.4674 63.9782 56.4814C63.9365 56.4954 63.9087 56.5654 63.9087 56.6074C63.9087 58.5944 63.9365 62.6384 63.9643 63.366C64.006 64.1496 64.1589 64.2476 64.4509 64.3316C64.6595 64.3875 64.7985 64.4015 65.1322 64.4435ZM69.3492 56.2436C69.3074 56.2156 69.3214 56.0616 69.3492 56.0337C69.6689 56.0337 70.3363 56.0756 71.0315 56.0756C71.7545 56.0756 72.1855 56.0337 72.4914 56.0337C72.5192 56.0756 72.5331 56.2016 72.5053 56.2436L71.9213 56.3415C71.6155 56.4395 71.5738 56.6214 71.5459 57.0971C71.5181 57.6289 71.5042 59.0282 71.5042 60.2316C71.5042 61.7428 71.5181 63.0862 71.532 63.5479C71.5599 63.9537 71.5877 64.2196 71.9631 64.3176C72.1438 64.3735 72.3941 64.4015 72.6443 64.4295C72.6861 64.4715 72.6582 64.6254 72.6304 64.6534C72.2411 64.6534 71.7545 64.6114 71.1288 64.6114C70.3224 64.6114 70.0443 64.6534 69.3631 64.6534C69.3213 64.6114 69.3352 64.4715 69.3631 64.4295C69.5716 64.4155 69.8219 64.3735 69.9748 64.3316C70.3224 64.2616 70.378 64.0657 70.4058 63.6879C70.4336 63.2821 70.4475 61.1691 70.4475 59.8957C70.4475 58.7623 70.4475 57.6988 70.4197 57.0551C70.378 56.7333 70.378 56.4534 70.0721 56.3695C69.9192 56.3275 69.6828 56.2855 69.3492 56.2436ZM78.8768 64.8633C77.6393 64.8633 76.5131 64.3316 75.8179 63.5619C74.9976 62.6524 74.6361 61.435 74.6361 60.2736C74.6361 59.2661 74.9281 58.3845 75.4008 57.6708C76.1794 56.5374 77.6671 55.8238 79.0853 55.8238C81.8521 55.8238 83.2842 57.8807 83.2842 60.1896C83.2842 61.337 83.0062 62.2326 82.4639 63.0302C81.6575 64.2336 80.2671 64.8633 78.8768 64.8633ZM79.3912 64.4295C80.0029 64.4295 80.5591 64.2336 80.9345 63.8978C81.7965 63.1561 82.1163 61.9387 82.1163 60.6374C82.1163 59.2101 81.6436 57.6568 80.5174 56.8313C80.0169 56.4395 79.4051 56.2156 78.6543 56.2156C78.1398 56.2156 77.6949 56.3555 77.3195 56.5654C76.3046 57.1951 75.8596 58.5104 75.8596 59.9517C75.8596 61.351 76.3602 63.0302 77.5976 63.8978C78.0703 64.2336 78.6682 64.4295 79.3912 64.4295ZM84.1762 54.4846C85.1928 54.9455 85.9856 55.4619 86.5546 56.0337C86.858 56.3386 87.1827 56.6895 87.2775 56.8033C88.7374 58.6364 91.7963 62.4145 92.408 63.1421L92.4497 63.1142C92.4497 61.2671 92.4775 58.0627 92.3941 57.1531C92.3663 56.7473 92.2829 56.5094 91.8936 56.3835C91.6572 56.3135 91.3931 56.2855 91.0594 56.2436C91.0316 56.2156 91.0455 56.0616 91.0733 56.0337C91.4348 56.0337 92.0326 56.0756 92.6861 56.0756C93.1032 56.0756 93.8123 56.0337 93.9791 56.0337C94.007 56.0616 94.007 56.2156 93.9791 56.2436C93.7289 56.2855 93.6037 56.3135 93.4369 56.3555C93.0754 56.4674 92.992 56.7613 92.9781 57.1111C92.8947 58.2166 92.9086 60.9872 92.8807 62.8203C92.8807 63.45 92.8947 64.2336 92.9086 64.6814C92.7556 64.6674 92.2829 64.6674 92.1021 64.6814C91.4348 63.6739 87.1663 58.3565 86.5546 57.5729C86.5406 57.5589 86.4989 57.5729 86.4989 57.5869C86.4711 59.0002 86.485 62.6384 86.5128 63.394C86.5406 64.0657 86.7353 64.2336 87.0551 64.3176C87.2636 64.3735 87.5278 64.4015 87.792 64.4295C87.8337 64.4575 87.8198 64.6394 87.7781 64.6534C87.5139 64.6534 86.9021 64.6114 86.2209 64.6114C85.5257 64.6114 85.0807 64.6534 84.8027 64.6534C84.7749 64.6254 84.7749 64.4575 84.8027 64.4295C85.0807 64.4015 85.2337 64.3875 85.4144 64.3316C85.7203 64.2476 85.915 64.0937 85.9567 63.408C85.9984 62.7503 86.054 60.1896 86.0818 57.293C86.0818 57.1111 86.1299 56.7613 85.8881 56.3835C85.7269 56.1316 85.1563 55.4986 84.1762 54.4846ZM12.5253 25.104C16.8431 18.9762 22.1039 10.152 24.8546 5.3883C25.9267 3.53162 26.6403 2.45263 26.7718 1.98288C26.9032 1.51313 25.962 1.14241 26.864 0.178079C27.766 -0.786255 35.3942 2.36759 34.4063 4.79124C33.4184 7.21489 26.4471 18.8413 21.8635 25.4986C19.7642 28.5476 15.165 35.3117 12.2988 39.9837C8.90686 45.5127 7.04541 48.7756 5.9836 49.5517C4.92179 50.3277 1.95884 49.39 1.0461 47.5808C0.133366 45.7716 5.37268 37.6842 6.68946 35.1728C8.00625 32.6615 8.53896 31.047 8.80628 30.5693C3.1066 29.383 5.40276 15.9599 5.64267 12.7876C6.06337 5.63394 6.46435 1.78815 6.8456 1.25018C7.41749 0.443236 10.7263 0.924806 12.2988 1.14241C13.8129 1.35195 15.3912 1.64222 16.3881 2.20028C17.3849 2.75835 16.9737 4.96725 15.7203 7.21489C14.4669 9.46253 12.8361 19.541 12.5253 25.104ZM30.3157 22.4212C33.4519 15.7424 36.6519 9.13732 44.2679 3.55182C51.8838 -2.03367 58.293 1.10585 60.5529 3.55182C62.8128 5.9978 63.1276 8.91524 62.0918 12.6687C61.056 16.4222 55.9378 23.1402 55.1504 23.9104C52.81 26.1993 48.5084 26.0501 47.2961 23.6023C46.2397 21.4692 47.8934 20.7451 48.9208 19.5886C51.0525 17.1898 53.1292 14.8422 54.7925 12.0862C55.2536 11.3225 56.099 10.0681 56.0438 9.13732C55.9549 7.63793 54.2912 6.77798 51.2538 7.62016C48.2163 8.46233 45.2955 11.63 43.9892 13.1586C43.2244 14.0534 37.2778 22.4813 34.9163 30.956C32.5548 39.4308 34.4119 43.5534 38.7459 42.7722C40.0468 42.4709 41.3017 42.072 42.5105 41.5755C44.3239 40.8308 48.7777 38.2445 50.1048 37.108C51.4319 35.9714 53.2902 37.7483 49.7684 43.2906C46.2465 48.8328 39.6574 52.2157 31.1272 48.2279C22.597 44.2401 27.1795 29.1001 30.3157 22.4212ZM67.6439 23.5446C66.7755 21.7967 67.6813 18.1839 70.1596 14.4167C72.1128 11.4476 74.3857 8.94917 78.1516 6.31581C81.9175 3.68244 84.7525 1.60674 87.9699 1.30377C91.1873 1.00079 92.6921 3.46384 93.5811 5.46174C94.47 7.45964 90.8942 8.65946 86.8124 10.8696C82.7306 13.0798 74.8347 20.2581 75.2084 22.0192C75.5821 23.7803 76.0743 23.6868 78.4382 25.881C80.802 28.0751 82.852 28.4172 84.9786 32.9057C87.1053 37.3942 84.9652 39.5526 82.9059 41.5129C80.8467 43.4732 74.9355 47.6263 69.6525 48.8826C64.3694 50.1388 60.0912 50.4843 58.005 48.8826C55.9188 47.2808 55.2986 46.983 55.2986 43.6096C55.2986 40.2363 60.5336 34.776 62.6577 34.776C64.7818 34.776 62.1364 39.2233 61.9644 40.126C61.7924 41.0287 64.537 41.9084 68.0864 40.7699C71.6359 39.6314 79.0848 36.8727 79.0848 34.5736C79.0848 32.2746 69.6743 27.6315 67.6439 23.5446Z">
                    </svg>        
                </a>
                <!-- logo -->
                <div class="header__nav-mob">
                    <ul class="header__lists-mob">
                        <?foreach($headers as $item){?>
                        <li class="header__item"><a href="<?=$item['PROPERTY_SSYLKA_VALUE']?>"><?=$item['NAME']?></a></li>
                        <?}?>
                    </ul>
                </div>
                <nav class="header__nav">
                    <ul class="header__lists">
                        <li class="header__item">
                            <div>услуги</div>
                            <div class="header__down">
                                <ul class="header__down-block">
                                    <li class="header__down-item "><a href="/mannequin/">съемка манекен</a></li>
                                    <li class="header__down-item "><a href="/predmetnaya-semka/">пРЕДМЕТНАЯ съемка</a></li>
                                    <li class="header__down-item "><a href="/sbornaya-semka/">СБОРНАЯ съемка</a></li>
                                </ul>
                            </div>
                           
                        </li>   
                        <li class="header__item"><a href="/portfolio/">портфолио</a></li>
                        <li class="header__item"><a href="/modeli/">Модели</a></li>
                        <li class="header__item"><a href="/about/">О нас</a></li>
                        <li class="header__item"><a href="/kontakty/">Контакты</a></li>
                        <li class="header__item"><a href="/blog/">блог</a></li>
                    </ul>
                </nav>
                <a href="/cabinet/" class="header__whatt">
                    <svg  viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.0004 43.4789C38.3642 43.4789 44.3337 37.5094 44.3337 30.1456C44.3337 22.7818 38.3642 16.8123 31.0004 16.8123C23.6366 16.8123 17.667 22.7818 17.667 30.1456C17.667 32.1608 18.1141 34.0717 18.9145 35.7843L17.89 42.1034C17.7805 42.7789 18.3665 43.3623 19.0415 43.2498L25.3068 42.2056C27.0334 43.0222 28.9636 43.4789 31.0004 43.4789Z" stroke="white" stroke-linecap="square" stroke-linejoin="round"/>
                        <path d="M36.3337 34.2937V33.7121C36.3337 32.9897 35.8938 32.34 35.223 32.0717L34.601 31.8229C33.9056 31.5447 33.1131 31.8461 32.7781 32.516C32.7781 32.516 31.2966 32.2197 30.1114 31.0345C28.9263 29.8493 28.63 28.3678 28.63 28.3678C29.2999 28.0329 29.6012 27.2403 29.323 26.5449L29.0742 25.9229C28.8059 25.2521 28.1562 24.8123 27.4338 24.8123H26.8522C26.1976 24.8123 25.667 25.3429 25.667 25.9974C25.667 31.2339 29.912 35.4789 35.1485 35.4789C35.803 35.4789 36.3337 34.9483 36.3337 34.2937Z" fill="white"/>
                        <circle cx="30.7119" cy="30.8701" r="29.5" stroke="white"/>
                    </svg>
                </a>
                <a href="tel:<?=$headerContacts['PROPERTY_TELEFON_VALUE']?>" class="header__phone"><?=$headerContacts['PROPERTY_TELEFON_VALUE']?></a>
                <?if(!$USER->IsAuthorized()){?>
                    <button href="#" class="header__lk header__login-btn"><span>войти</span></button>
                    <!-- <button class="header__lk login-open"><span></span></button> -->
                <?} else {?>
                    <a href="/cabinet/" class="header__lk">
                        
                        <span>ЛК</span></a>
                <?}?>
            </div>
        </div>
    </header>
	
	 