$(document).ready(function () {
    // $('.header__item').hover(function() {
    //     $(this).toggleClass('active');
    //     var isHovered = $(this).is(":hover");
    //     if (isHovered) {
    //       $(this).children('.header__down').stop().slideDown(300);
    //     } else {
    //       $(this).children('.header__down').stop().slideUp(300);
    //     }
    // });

    $(".header__item").hover(
        function () {
            clearTimeout($.data(this, "timer"));

            $(".header__down", this).stop(true, true).slideDown(400);
        },
        function () {
            $.data(
                this,
                "timer",
                setTimeout(
                    $.proxy(function () {
                        $(".header__down", this).stop(true, true).slideUp(400);
                    }, this),
                    100
                )
            );
        }
    );

    $(".entry__btn").hover(
        function () {
            $(".pagination").addClass("active-pag");
        },
        function () {
            $(".pagination").removeClass("active-pag");
        }
    );

    $(".header__burger").on("click", function () {
        $(".header__nav-mob").toggleClass("open-nav");
        $(".header").toggleClass("header--active");
        // $("main").toggleClass("main-none")
    });

    $(".header__bottom-mob-burger").on("click", function () {
        $(".header__bottom-mob-burger").toggleClass("open");
        // $("main").toggleClass("main-none")
    });

    $(".select").on("click", ".select-head", function () {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(this).next().fadeOut();
        } else {
            $(".select-head").removeClass("open");
            $(".select-list").fadeOut();
            $(this).addClass("open");
            $(this).next().fadeIn();
        }
    });

    $(".select").on("click", ".select-item", function () {
        $(".select-head").removeClass("open");
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).text());
    });

    $(document).click(function (e) {
        if (!$(e.target).closest(".select").length) {
            $(".select-head").removeClass("open");
            $(".select-list").fadeOut();
        }
    });

    $(".catalog-filter__item").click(function () {
        var id = $(this).attr("data-tab"),
            content = $('.catalog-filter__content[data-tab="' + id + '"]');

        $(".catalog-filter__item.active").removeClass("active"); // 1
        $(this).addClass("active"); // 2

        $(".catalog-filter__content.active").removeClass("active"); // 3
        content.addClass("active"); // 4
    });

    $(".catalog__filter-btn > span").on("click", function () {
        $(".catalog-filter").toggleClass("active");
    });

    //  $('.catalog-filter__btn-cancellation').click(function(){
    //     $('.catalog-filter').removeClass('active');
    //  });

    $(".catalog__filter-btn > svg").on("click", function () {
        $(".catalog-filter").addClass("active");
        $(".header").addClass("header--two");
        $(".catalog__wrapper").css("display", "none");
        $(".main").css("display", "none");
        $(".catalog__title").css("display", "none");
        $(".catalog__btn-all").css("display", "none");
    });

    $(".catalog-filter__content-title-close").on("click", function () {
        $(".catalog-filter").removeClass("active");
        $(".header").removeClass("header--two");
        $(".catalog__wrapper").css("display", "flex");
        $(".main").css("display", "block");
        $(".catalog__title").css("display", "flex");
        $(".catalog__btn-all").css("display", "block");
    });

    //  $('.record__checkbox > input[name=checkbox]').each(function () {
    //     $(this).parents('.record-form__block').toggleClass('active').next().slideToggle();
    //     $('.record__custom-checkbox').not(this).parent('.record-form__block').removeClass('active').next().slideUp();
    //  });
});

$(document).ready(function () {
    $(".minus").click(function () {
        var $input = $(this).parent().find("input");
        var count = parseInt($input.val()) - 1;
        count = count < 0 ? 0 : count;
        $input.val(count > 9 ? count : "0" + count);
        $input.change();

        return false;
    });
    $(".plus").click(function () {
        var $input = $(this).parent().find("input");
        var count = parseInt($input.val()) + 1;
        count = count < 0 ? 0 : count;
        $input.val(count > 9 ? count : "0" + count);
        $input.change();

        return false;
    });



    $(".record__checkbox > input[name=checkbox]").change(function () {
        console.log(1111)
        $(this).parents(".record-form").toggleClass("active");
        $(".record__checkbox > input[name=checkbox]").not(this).parent(".record-form").removeClass("active");
    });

    $(".record__custom-checkbox").change(function () {
        console.log(2222)
        $(this).parents(".record__photo-article").toggleClass("active");
        $(".record__checkbox > input[name=checkbox]").not(this).parent(".record__photo-article").removeClass("active");
    });

    $(".types-model__nav-text").click(function () {
        var id = $(this).attr("data-tab"),
            content = $('.types-model__js[data-tab="' + id + '"]');

        $(".types-model__nav-text.active").removeClass("active"); // 1
        $(this).addClass("active"); // 2

        $(".types-model__js.active").removeClass("active"); // 3
        content.addClass("active"); // 4
    });

    // $(".restore-modal__close").click(function () {
    //     $(".restore-modal").removeClass("active"); // 3
    // });

    // $(".restore-open").click(function () {
    //     $(".restore-modal").addClass("active"); // 3
    // });

    $(".record__photo-input-file input[type=file]").on("change", function () {
        let file = this.files[0];
        $(this).next().html(file.name);
    });

    $(".add-modal-open").click(function () {
        $(".add-popup").addClass("active");
    });

    $(".add-popup__close").click(function () {
        $(".add-popup").removeClass("active");
    });

    // $(".tt-modal-open").click(function () {
    //     $(".tt-modal").addClass("active");
    // });

    // $(".tt-modal__close").click(function () {
    //     $(".tt-modal").removeClass("active");
    // });
});

const players = Array.from(document.querySelectorAll(".web-video")).map((p) => new Plyr(p));

const player = new Plyr(".web-video", {
    volume: 1,
});

//этот код в script.js
$(document).ready(function () {
    $(":input").inputmask();
    $(".phone").inputmask({
        mask: "+7(999) 999-99-99",
        clearIncomplete: true, //проверка на заполненность
    });
    $(".email").inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        greedy: false,
        clearIncomplete: true,
        onBeforePaste: function (pastedValue, opts) {
            pastedValue = pastedValue.toLowerCase();
            return pastedValue.replace("mailto:", "");
        },
        definitions: {
            "*": {
                validator: "[0-9A-Za-z-а-я-_]",
                casing: "lower",
            },
        },
    });
});

$(document).on("change", ".record__custom-checkbox-pers > input[type=checkbox]", function () {
    var $this = $(this),
        $chks = $(document.getElementsByName(this.name)),
        $all = $chks.filter(".chk-all");

    if ($this.hasClass("chk-all")) {
        $chks.prop("checked", $this.prop("checked"));
    } else
        switch ($chks.filter(":checked").length) {
            case +$all.prop("checked"):
                $all.prop("checked", false).prop("indeterminate", false);
                break;
            case $chks.length - !!$this.prop("checked"):
                $all.prop("checked", true).prop("indeterminate", false);
                break;
            default:
                $all.prop("indeterminate", true);
        }
});

//правки от 20.03.24

function remToPx(remValue) {
    var htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    var pxValue = remValue * htmlFontSize;
    return Math.round(pxValue);
}

//добавление в избранное - незарегистрированный пользователь

//1 плашка для всех
// $(function () {
//     $(".model__like").on("click", function (e) {
//         e.preventDefault();
//         $(this).toggleClass("active");
//         let modelElement = $(this).closest(".model");
//         let favBlockPositionTop, favBlockPositionLeft;
//         if ($(window).width() > 769) {
//             favBlockPositionTop = modelElement.position().top + modelElement.outerHeight() - remToPx(8);
//             favBlockPositionLeft = modelElement.position().left + modelElement.outerHeight() - remToPx(11);
//         } else {
//             favBlockPositionTop = modelElement.position().top + modelElement.outerHeight() - remToPx(22);
//             favBlockPositionLeft = modelElement.position().left + modelElement.outerHeight() - remToPx(27);
//         }
//         if ($(this).hasClass("active")) {
//             $(".models__fav-block").css({
//                 display: "block",
//                 top: favBlockPositionTop,
//                 left: favBlockPositionLeft,
//             });
//         } else {
//             $(".models__fav-block").css("display", "none");
//         }
//     });
// });

//плашка на каждой карточке
$(function () {
    $(".model__like").on("click", function (e) {
        e.preventDefault();
        // e.stopPropagation()
        $(this).toggleClass("active");

        if ($(this).hasClass("active")) {
            let cardWrapper = $(this).closest(".model-wrapper");
            let favBlock = cardWrapper.find(".model__fav-block");

            $(".model__fav-block").not(favBlock).fadeOut(200);
            favBlock.fadeToggle(200);
        } else {
            let cardWrapper = $(this).closest(".model-wrapper");
            let favBlock = cardWrapper.find(".model__fav-block");
            favBlock.fadeOut(200);
        }
    });
});

//уведомления о съемках
$(function () {
    $(".model__notif").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let cardWrapper = $(this).closest(".model-wrapper");
        let notifBlock = cardWrapper.find(".model__notif-details");
        let favIco = cardWrapper.find(".model__like");

        $(this).fadeOut(200);
        favIco.fadeOut(200);
        notifBlock.fadeIn(200);
    });
});

$(function () {
    $(".model__notif-details_close").on("click", function (e) {
        e.stopPropagation()
        let cardWrapper = $(this).closest(".model-wrapper");
        let favIco = cardWrapper.find(".model__like");
        let notifIco = cardWrapper.find(".model__notif");
        let notifBlock = $(this).closest(".model__notif-details");

        if (notifBlock.find(".record__custom-checkbox:checked").length) {
            notifIco.addClass("active");
        } else {
            notifIco.removeClass("active");
        }

        notifBlock.fadeOut(200);
        favIco.fadeIn(200);
        notifIco.fadeIn(200);
    });
});

//удаление модели из избранных
$(".personal__tab-models-wrapper .model__like").on("click", function (e) {
    e.stopPropagation()
    if ($(this).hasClass("active")) {
        let modelCard = $(this).closest(".model-wrapper");
        modelCard.remove();
    }
});

//создание обращения
$(".request-create_dropdown__title").on("click", function () {
    let $dropdown = $(this).closest(".request-create_dropdown");
    $dropdown.toggleClass("open");
    $dropdown.find(".request-create_dropdown__list").slideToggle();
});

$(".request-create_dropdown__list").on("click", "li", function () {
    $(this).toggleClass("active");
});

let $newRequestBtn = $(".request__new-request-link");
let $requestStep1 = $(".request-create__step-1");
let $requestStep2 = $(".request-create__step-2");
let $progressLine = $(".progress-line");
let $requestBackBtn = $(".request-back-link");
let $chatBackBtn = $(".personal__tab-content_box.chat .request-back-link");

$newRequestBtn.on("click", function () {
    $(".personal__tab-content_box.request").removeClass("active").hide();
    $(".personal__tab-content_box.request-create").addClass("active").fadeIn(200);
    toggleBackLinkVisibility();
});

$requestBackBtn.on("click", function () {
    if ($requestStep2.hasClass("active")) {
        $requestStep2.removeClass("active").hide();
        $requestStep1.addClass("active").fadeIn(200);
        $(".progress-numbers span:first-of-type").removeClass("complete").text("1");

        if ($(window).width() < 769) {
            $progressLine.css("width", "20.6rem");
        } else {
            $progressLine.css("width", "29.5rem");
        }
        toggleBackLinkVisibility();
    } else {
        $(".personal__tab-content_box.request-create").removeClass("active").hide();

        $(".personal__tab-content_box.request").addClass("active").fadeIn(200);
        toggleBackLinkVisibility();
    }
});

$chatBackBtn.on("click", function () {
    $(".personal__tab-content_box.chat").removeClass("active").hide();
    $(".personal__tab-content_box.request").addClass("active").fadeIn(200);
    toggleBackLinkVisibility();
});

$requestStep1.find(".request__create-request-link").on("click", function () {
    $requestStep1.removeClass("active").hide();
    $requestStep2.addClass("active").fadeIn(200);
    $(".progress-numbers span:first-of-type").addClass("complete").text("");

    if ($(window).width() < 769) {
        $progressLine.css("width", "38.7rem");
    } else {
        $progressLine.css("width", "60.7rem");
    }
});

$requestStep2.find(".request__request-next-link").on("click", function () {
    $(".personal__tab-content_box.request-create").removeClass("active").hide();
    $(".personal__tab-content_box.chat").addClass("active").fadeIn(200);
    toggleBackLinkVisibility();
});

$(".request_item__chat-link").on("click", function () {
    $(".personal__tab-content_box.request").removeClass("active").hide();
    $(".personal__tab-content_box.chat").addClass("active").fadeIn(200);
    toggleBackLinkVisibility();
});

function toggleBackLinkVisibility() {
    if ($(window).width() < 769) {
        if ($(".request-create").hasClass("active") || $(".personal__tab-content_box.chat").hasClass("active")) {
            $(".personal__back-link").hide();
        } else {
            $(".personal__back-link").show();
        }
    }
}

//модалки
$(".modal__close, .cancel-btn, .background-blur").on("click", function (e) {
    e.stopPropagation()
    $("body").removeClass("lock");
    $(".background-blur").fadeOut(200);
    $(".modal").removeClass("active");
});

$(".cancel-order-btn").on("click", function () {
    $("body").addClass("lock");
    $(".background-blur").fadeIn(200);
    $(".modal-cancel_order").addClass("active");
});

$(".confirm-btn").on("click", function () {
    $(".modal-cancel_order").removeClass("active");
    $(".modal-cancel_reason").addClass("active");
});

$(".btn-modal-send").on("click", function () {
    if($('.modal-cancel_reason .record__custom-checkbox:checked').length){
        $(".modal-cancel_reason").removeClass("active");
        $("body").removeClass("lock");
        $(".background-blur").fadeOut(200);
    }
});

$(".record__custom-checkbox").on("change", function () {
    if ($(this).is(":checked") && $(this).val() === "Другое") {
        $(this).closest(".record__checkbox-with-input").find("label span").hide();
        $(this).closest(".record__checkbox-with-input").find(".other-input").fadeIn(200);
    } else {
        $(this).closest(".record__checkbox-with-input").find("label span").show();
        $(this).closest(".record__checkbox-with-input").find(".other-input").hide();
    }
});

//заполнение тз
new AirDatepicker("#input-date");

$(".dropdown_top").on("click", function () {
    let $formItem = $(this).closest(".tz_form__item");
    $formItem.toggleClass("open");
    $formItem.find(".dropdown_list").slideToggle();
});

$(function () {
    $('.add-file-input input[type="file"]').on("change", function () {
        let fileName = $(this).val().split("\\").pop();
        if (fileName) {
            $(this).siblings("span").text(fileName).css("color", "#242424");
        }
    });
});

//карточка заказа
$(".item-dropdown_top").on("click", function () {
    let $dropdown = $(this).closest(".item-dropdown");
    $dropdown.toggleClass("open");
    $dropdown.find(".item-dropdown_list").slideToggle();
});

$(".item-dropdown_list__item").on("click", function () {
    let $dropdown = $(this).closest(".item-dropdown");
    let $topSpan = $dropdown.find(".item-dropdown_top span");
    $topSpan.text($(this).text());
    $dropdown.removeClass("open");
    $dropdown.find(".item-dropdown_list").slideUp();
    $(this).addClass("active").siblings().removeClass("active");

    if ($(this).attr("id") === "tzOwn" && $(this).hasClass("active")) {
        $(".order-detail_bottom__tz").show();
    } else {
        $(".order-detail_bottom__tz").hide();
    }
});

//login modal
$(".header__login-btn").on("click", function () {
    $("body").addClass("lock");
    $(".background-blur").fadeIn(200);
    $(".modal-login").addClass("active");
});

$(".modal-login__register-btn").on("click", function () {
    $(".modal-login").removeClass("active");
    $(".modal-registration").addClass("active");
});

$(".modal-registration__login-btn").on("click", function () {
    $(".modal-registration").removeClass("active");
    $(".modal-login").addClass("active");
});

// $(".modal-login__submit").on("click", function () {
//     let allInputsFilled = true;
//     $(".modal-login input").each(function () {
//         if ($(this).val() === "") {
//             allInputsFilled = false;
//             return false;
//         }
//     });
//     if (allInputsFilled) {
//         $("body").removeClass("lock");
//         $(".background-blur").fadeOut(200);
//         $(".modal").removeClass("active");
//     } else {
//         return;
//     }
// });

// reg modal
// $(".modal-registration__submit.reg-complete").on("click", function () {
//     let allInputsFilled = true;
//     $(".modal-registration input").each(function () {
//         if ($(this).val() === "") {
//             allInputsFilled = false;
//             return false;
//         }
//     });
//     if (allInputsFilled) {
//         $(".modal-registration").removeClass("active");
//         $(".modal-reg-complete").addClass("active");
//     } else {
//         return;
//     }
// });

//restore modal
$(".modal-login__restore").on("click", function () {
    $(".modal-login").removeClass("active");
    $(".modal-restore").addClass("active");
});

$(".modal-restore .link").on("click", function (e) {
    if ($(".modal-restore input").val() !== "") {
        e.preventDefault();
        $(".modal-restore").removeClass("active");
        $(".modal-restore-success").addClass("active");
    } else {
        return;
    }
});

//leave request
$(".leave-req-link").on("click", function (e) {
    e.preventDefault()
    $("body").addClass("lock");
    $(".background-blur").fadeIn(200);
    $(".modal-feedback").addClass("active");
});

$(".modal-feedback .feedback__submit").on("click", function () {
    let allInputsFilled = true;
    $(".modal-feedback input").each(function () {
        if ($(this).val() === "") {
            allInputsFilled = false;
            return false;
        }
    });
    if (allInputsFilled) {
        $(".modal-feedback").removeClass("active");
        $(".modal-fb-complete").addClass("active");
    } else {
        return;
    }
});

//leave request from contacts
$(".contacts__form .link").on("click", function (e) {
    let allInputsFilled = true;
    $(".contacts__form input").each(function () {
        e.preventDefault();
        if ($(this).val() === "") {
            allInputsFilled = false;
            return false;
        }
    });
    if (allInputsFilled) {
        $("body").addClass("lock");
        $(".background-blur").fadeIn(200);
        $(".modal-fb-complete").addClass("active");
    } else {
        return;
    }
});

//leave request from subject-shooting
$(".shot-intro__form .link").on("click", function (e) {
    e.preventDefault();
    let allInputsFilled = true;
    $(".shot-intro__form input").each(function () {
        if ($(this).val() === "") {
            allInputsFilled = false;
            return false;
        }
    });
    if (allInputsFilled) {
        $("body").addClass("lock");
        $(".background-blur").fadeIn(200);
        $(".modal-fb-complete").addClass("active");
    } else {
        return;
    }
});

//leave request from feedback
$(".feedback .feedback__submit").on("click", function (e) {
    e.preventDefault();
    let allInputsFilled = true;
    $(".feedback .feedback__form input").each(function () {
        if ($(this).val() === "") {
            allInputsFilled = false;
            return false;
        }
    });
    if (allInputsFilled) {
        $("body").addClass("lock");
        $(".background-blur").fadeIn(200);
        $(".modal-fb-complete").addClass("active");
    } else {
        return;
    }
});

//tz-success
$(".modal-tz-success .link").on("click", function (e) {
    e.preventDefault()
    $("body").removeClass("lock");
    $(".background-blur").fadeOut(200);
    $(".modal-tz-success").removeClass("active");
});

//example modal
$('.example-open').on('click', function(){
    $(this).find(".modal-example").addClass("active");
    $("body").addClass("lock");
    $(".background-blur").fadeIn(200);
})


$(document).ready(function() {
    $('.file-input').each(function() {
        let fileInput = $(this);
        const uploadLabel = fileInput.siblings('.upload-label');
        const fileInfo = fileInput.siblings('.file-info');
        const fileName = fileInfo.find('.file-name');
        const removeButton = fileInfo.find('.remove-button');

        uploadLabel.click(function() {
            fileInput.click();
        });

        fileInput.change(function() {
            const file = $(this)[0].files[0];
            if (file) {
                fileName.text(file.name);
                fileInfo.show();
                uploadLabel.hide();
            } else {
                fileInfo.hide();
                uploadLabel.show();
            }
        });

        removeButton.click(function() {
            fileInput.val('');
            fileInfo.hide();
            uploadLabel.show();
        });
    });
});



$(document).ready(function() {
    let selectedFile = null;

    $('.chat__add-file input').on('change', function(event) {
        selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $('.chat__input input').data('file-info', {
                    name: selectedFile.name,
                    size: selectedFile.size,
                    type: selectedFile.type,
                    url: e.target.result
                });
                $('.chat__input').append(`<div class="file-info">Selected file: ${selectedFile.name}</div>`);
            };
            reader.readAsDataURL(selectedFile);
        }
    });

    // $('.chat__send').on('click', function() {
    //     const messageText = $('.chat__input input').val();
    //     const fileInfo = $('.chat__input input').data('file-info');

    //     if (messageText || fileInfo) {
    //         const messageHtml = `
    //             <div class="msg msg--outgoing">
    //                 <div class="msg__container">
    //                     ${fileInfo ? `<a href="${fileInfo.url}" download="${fileInfo.name}">${fileInfo.name}</a>` : ''}
    //                     <div class="msg__text">${messageText}</div>
    //                 </div>
    //                 <div class="msg__time">${new Date().toLocaleTimeString()}</div>
    //             </div>
    //         `;

    //         $('.chat__msgs').append(messageHtml);
    //         $('.chat__input input').val('').removeData('file-info');
    //         $('.file-info').remove();
    //         selectedFile = null;
    //     }
    // });
});