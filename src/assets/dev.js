$(document).ready(function(){

    $(document).on("click", ".model__like", function(){
        console.log(2);
    })

    function reset () {
      $('input').val('');
    };

    // Маска на телефон
    $('.mask-phone').mask('+7 (999) 999-99-99');
    
    //модалки портфолио
    $(".add-modal-open").click(function() {
        
        //console.log($(this).attr("data-index"));
        modalClass = $(this).attr("data-index");
        $("."+ modalClass).addClass("active");
       
    });


    /*$(document).on('click', '.portfolio__btn', function(){

        var targetContainer = $('.example__wrapper');
        //data1 = $('.portfolio__btn').attr('data-count');
        data2 = $('.portfolio__btn').attr('data-section');


        //data.push("COUNT", data1);
        //data.APP("ID", data2);
        
        //console.log(data);
        $.ajax({
            type: 'post',
            url: '/ajax/portfolio.php',
            data: {id: data2},
            //dataType: 'json',
            success: function(e){
                console.log(e);
                console.log(targetContainer);
                //$("#pag").html(e);

            },
            error: function(e){
                console.log(e);
            }
        });
        return false;

    });*/

    /*$(document).on('click', '.portfolio__btn', function(){

        

        var targetContainer = $('.example__wrapper'),
            url =  $('.portfolio__btn').attr('data-url');

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){

                    $('.portfolio__btn').remove();

                    var elements = $(data).find('.product-model'),
                        pagination = $(data).find('.portfolio__btn');

                    targetContainer.append(elements);
                   $('#pag').append(pagination);

                }
            });
            $.ajax({
            type: 'post',
            url: '/ajax/portfolio1.php',
            //data: {id: data2},
            //dataType: 'json',
            success: function(e){
                console.log(e);
                //console.log(targetContainer);
                $("#pag").html(e);

            },
            error: function(e){
                console.log(e);
            }
        });
        }

    });*/

    $(document).on('click', '.portfolio__btn', function(){
        $('.product-model').css("display", "block");
        $(this).css("display", "none")
    })

    //  sbornaya examples show more btn

    //$(document).on('click', '#sbornaya_show_more', function(){

        //console.log($(this).attr("data-url"));
        //window.location.href = $(this).attr("data-url");

        // var targetContainer = $('.example__wrapper'),
        //     url =  $('#sbornaya_show_more').attr('data-url');

        // if (url !== undefined) {
        //     $.ajax({
        //         type: 'GET',
        //         url: url,
        //         dataType: 'html',
        //         success: function(data){

        //             $('.example__btn-all').remove();

        //             var elements = $(data).find('.product-model'),
        //                 pagination = $(data).find('#sbornaya_show_more');

        //             targetContainer.append(elements);
        //            $('#pag1').append(pagination);

        //         }
        //     });
        // }

    //});

    //  predmetnaya examples show more btn

    $(document).on('click', '.example-two__link', function(){


        var targetContainer = $('.example__wrapper'),
            url =  $('.example-two__link').attr('data-url');

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){

                    $('.example-two__link').remove();

                    var elements = $(data).find('.product-model'),
                        pagination = $(data).find('.example-two__link');

                    targetContainer.append(elements);
                   $('#pag1').append(pagination);

                }
            });
        }

    });

    // sbornaya models show more btn

    $(document).on('click', '.models-sbornaya__btn', function(){

        var targetContainer = $('.hub-model__wrapper'),
            url =  $('.models-sbornaya__btn').attr('data-url');

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){

                    $('.models-sbornaya__btn').remove();

                    var elements = $(data).find('.model__for_button'),
                        pagination = $(data).find('.models-sbornaya__btn');

                    targetContainer.append(elements);
                   $('#pagModels').append(pagination);

                }
            });
        }

    });

    //sbornaya show more mobile
    
    $(document).on('click', '.models-sbornaya__btn', function(){

        var targetContainer = $('.hub-model__mobile'),
            url =  $('.models-sbornaya__btn').attr('data-url');

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){

                    $('.models-sbornaya__btn').remove();

                    var elements = $(data).find('.model__for_button'),
                        pagination = $(data).find('.models-sbornaya__btn');

                    targetContainer.append(elements);
                   $('#pagModels').append(pagination);

                }
            });
        }

    });  

    // models show more btn

    $(document).on('click', '.models-page__btn', function(){

        var targetContainer = $('.catalog__wrapper'),
            url =  $('.models-page__btn').attr('data-url');

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){

                    $('.models-page__btn').remove();

                    var elements = $(data).find('.model'),
                        pagination = $(data).find('.models-page__btn');

                    targetContainer.append(elements);
                   $('#modelsPag').append(pagination);

                }
            });
        }

    });

    // blog show more

    $(document).on('click', '.blog-main__btn-all', function(){

        var targetContainer = $('.blog__cont'),
            url =  $('.blog-main__btn-all').attr('data-url');

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){

                    $('.blog-main__btn-all').remove();

                    var elements = $(data).find('.blog__elem'),
                        pagination = $(data).find('.blog-main__btn-all');

                    targetContainer.append(elements);
                   $('#pag').append(pagination);

                }
            });
        }

    });

    //contacts form

    $(document).ready(function(){
      $('.contacts__form').submit(function(){
        var that = $(this);
        var data = that.serialize();
        
        $.ajax({
          type: 'post',
          url: '/ajax/form-rev.php',
          data: data,
          dataType: 'json',
          success: function (e) {
            console.log(true);
                $.fancybox.open({
                src  : '.modal-fb-complete',
                type : 'inline',
                opts : {},
            });
            reset();
          },
          error: function (e) {
            console.log(false);
          }
        });
        return false;

      })
    });

    //service form

    $(document).ready(function(){
      $('.shot-intro__form').submit(function(){
        var that = $(this);
        var data = that.serialize();
        
        $.ajax({
          type: 'post',
          url: '/ajax/form-rev.php',
          data: data,
          dataType: 'json',
          success: function (e) {
            console.log(true);
            $.fancybox.open({
                src  : '.modal-fb-complete',
                type : 'inline',
                opts : {},
            });
            reset();
          },
          error: function (e) {
            console.log(false);
          }
        });
        return false;

      })
    });

    //bottom feedback form

    $(document).ready(function(){
      $('.feedback__form').submit(function(){
        var that = $(this);
        var data = that.serialize();
        
        $.ajax({
          type: 'post',
          url: '/ajax/form-rev.php',
          data: data,
          dataType: 'json',
          success: function (e) {
            console.log(true);
            $.fancybox.close();
            $.fancybox.open({
                src  : '.modal-fb-complete',
                type : 'inline',
                opts : {},
            });
            reset();
          },
          error: function (e) {
            console.log(false);
          }
        });
        return false;

      })
    });


    // models filter

    $(".catalog-filter__btn-apply").on("click", function (e) {
        let data = $(".catalog-filter__content").serialize()
        $.ajax({
            url: '/ajax/models-filter.php',
            type: "POST",
            dataType: "html",
            data: data,
            success: function (response) {
                $(".content_here").html(response)
            },
            error: {
            }

        })
        e.preventDefault()
    })

    // Страница записи на съемку

    //

    $(document).on("input", "#art_change", function(e){
        if($(this).val() < 0){
            $(this).val("");
        }
    })

    // выбор даты записи, форма записи

    $(document).on("click", "#art_change", function(e){
        if($("#cur_date").val() == ""){
            document.getElementById("date").scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
        }
    })

    $(document).on("click","#date", function(e) {

        type = $(this).attr("data-value");
        dateId = $(this).attr("data-id");
        $("[id=art_change]").prop('readonly', false);
        $('#cur_date').val(dateId);
        console.log(type);
        if(type == 22){
            $("#form2_1").css("display", "none");
            $("#form2_1").find("input").val('');
            $("#form2").css("display", "block");
            $("#record_type").val("RECORD");
            $(".asos__record").css("display", "none");
            data = $('#form2').serialize() + '&DATE_ID=' + dateId;
        } else{
            $("#form2").css("display", "none");
            $("#form2").find("input").val('');
            $("#form2_1").css("display", "block");
            $("#record_type").val("ASOS");
            $(".asos__record").css("display", "block");
            data = $('#form2_1').serialize() + '&DATE_ID=' + dateId;
        }

        $.ajax({
          type: 'post',
          url: '/ajax/articles.php',
          data: data,
          dataType: 'html',
          success: function (e) {
            $(".art_count").html(e);
            $(".art_count").css("color", "#242424");
          },
          error: function (e) {
            console.log(false);
          }
        });

        bg_data = { "DATE_TYPE":type, "DATE_ID":dateId };
        $.ajax({
          type: 'post',
          url: '/ajax/date_bg.php',
          data: bg_data,
          dataType: 'html',
          success: function (e) {
            //console.log(e);

            $("#form5").html(e);
          },
          error: function (e) {
            console.log(false);
          }
        });
        return false;
    })

    // запись на съемку

    $(document).on("click","#success_button", function(e) {
        if($(this).attr('disabled')) return;
        $(this).attr('disabled', true);
        var formData = new FormData();
        var formData = new FormData($('#form2').get(0));
        var formData1 = new FormData($('#form1').get(0)); // данные с формы 1
        var formData3 = new FormData($('#form3').get(0)); // данные с формы 3
        var formData4 = new FormData($('#form4').get(0)); // данные с формы 4
        var formData5 = new FormData($('#form5').get(0)); // данные с формы 5
        var formData6 = new FormData($('#form2_1').get(0)); // данные с формы 2_1

        // добавляем  данные с форм 1, 3-5 в formData
        for (var pair of formData1.entries()) { 
            formData.append(pair[0], pair[1]);
        }
        for (var pair of formData3.entries()) { 
            formData.append(pair[0], pair[1]);
        }
        for (var pair of formData4.entries()) { 
            formData.append(pair[0], pair[1]);
        }
        for (var pair of formData5.entries()) { 
            formData.append(pair[0], pair[1]);
        }
        for (var pair of formData6.entries()) { 
            formData.append(pair[0], pair[1]);
        }
        if(!document.getElementsByName("USER_NAME")[0].value){
            el = $("[name='USER_NAME']").parent();
            el.css("color", "red");
        } else{
            el = $("[name='USER_NAME']").parent();
            el.css("color", "#242424");
        }
        if(!document.getElementsByName("BRAND_NAME")[0].value){
            el = $("[name='BRAND_NAME']").parent();
            el.css("color", "red");
        } else{
            el = $("[name='BRAND_NAME']").parent();
            el.css("color", "#242424");
        }
        if(!document.getElementsByName("EMAIL")[0].value){
            el = $("[name='EMAIL']").parent();
            el.css("color", "red");
        } else{
            el = $("[name='EMAIL']").parent();
            el.css("color", "#242424");
        }
        if(!document.getElementsByName("PHONE_NUMBER")[0].value){
            el = $("[name='PHONE_NUMBER']").parent();
            el.css("color", "red");
        } else{
            el = $("[name='PHONE_NUMBER']").parent();
            el.css("color", "#242424");
        }
        
        $.ajax({
          type: 'post',
          contentType: false, 
          processData: false, 
          url: '/ajax/make_order.php',
          data: formData,
          //dataType: 'json',
          success: function (e) {
            console.log(true);
            console.log(e);
            if(e == "CLIENT_VALIDATION_FAILURE"){
                //console.log('failrue')
                document.getElementById("form1").scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
                $(this).attr('disabled', false);
                //console.log(e);
            } else{
                if(e == "EMAIL_VALIDATION_FAILURE"){
                    el = $("[name='EMAIL']").parent();
                    el.find("label").html("номер* (неверный формат email)");
                    el.css("color", "red");
                    document.getElementById("form1").scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
                    $(this).attr('disabled', false);
                } else{
                    if(e == "ASUS_ARTICLES_VALIDATION_FAILURE"){
                        $("#result_price").css("color", "red");
                        document.getElementById("form2_1").scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
                        document.getElementById("form2").scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
                        $(this).attr('disabled', false);
                    } else{
                        if(e == "ARTICLES_VALIDATION_FAILURE"){
                            $("#result_price").css("color", "red");
                            $(this).attr('disabled', false);
                        } else{
                            if(e == 'ARTICLES_FREE_VALIDATION_FAILURE'){
                                $("#result_price").html('Недопустимое количество артикулов');
                                $("#result_price").css("color", "red");
                                document.getElementById("form2_1").scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
                                document.getElementById("form2").scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
                                $(this).attr('disabled', false);
                            } else{
                                
                                console.log('payment_success');
                                res = e;
                                Object.entries(res);
                                console.log(res);
                                console.log(e);
                                $(this).attr('disabled', false);
                                window.location.href = e;
                                
                                
                            }
                        }
                    }
                }
            }
          },
          error: function (e) {
            //$("#result_price").css("color", "red");
            console.log(false);
            $(this).attr('disabled', false);
          }
        });
        return false;
        
    })

    // расчет артикулов, форма записи

    $(document).on("input","#form2", function(e) {
        if($("[name='SUMKA']").is(':checked')){
        } else{
            $("[name='SUMKA_COUNT']").val("");
        }
        if($("[name='OBUV']").is(':checked')){
        } else{
            $("[name='OBUV_COUNT']").val("");
        }
        if($("[name='UKRASHENIA']").is(':checked')){
        } else{
            $("[name='UKRASHENIA_COUNT']").val("");
        }
        if($("[name='BELIE']").is(':checked')){
        } else{
            $("[name='BELIE_COUNT']").val("");
        }
        if($("[name='ODEJDA']").is(':checked')){
        } else{
            $("[name='ODEJDA_COUNT']").val("");
        }
        if($("[name='OBRAZY']").is(':checked')){
        } else{
            $("[name='OBRAZY_COUNT']").val("");
        }
        if($("[name='OBRAZY_OBUV']").is(':checked')){
        } else{
            $("[name='OBRAZY_OB_COUNT']").val("");
        }
        if($("[name='OBRAZY_OB_JEW']").is(':checked')){
        } else{
            $("[name='OBRAZY_OB_JEW_COUNT']").val("");
        }
        //var articles = $(this).val();
        data = $("#form2").serialize() + '&DATE_ID=' + dateId;;
        $.ajax({
          type: 'post',
          url: '/ajax/articles.php',
          data: data,
          dataType: 'html',
          success: function (e) {
            console.log(e);
            if(e == "превышено"){
                $("#result_price").html("Недопустимое количество артикулов");
                $(".art_count").css("color", "red");
            }
            $(".art_count").html(e);
            if(e != "превышено"){
                $(".art_count").css("color", "#242424");
            }
            //reset();
          },
          error: function (e) {
            console.log(false);
          }
        });
        return false;
    })

    //расчет артикулов для ASOS съемки

    $(document).on("input","#form2_1", function(e) {
        if($("[name='ASOS_ART']").is(':checked')){
        } else{
            $("[name='ASOS_ART_COUNT']").val("");
        }
        if($("[name='OBRAZY_ASOS']").is(':checked')){
        } else{
            $("[name='OBRAZY_ASOS_COUNT']").val("");
        }
        //var articles = $(this).val();
        data = $("#form2_1").serialize() + '&DATE_ID=' + dateId;;
        $.ajax({
          type: 'post',
          url: '/ajax/articles.php',
          data: data,
          dataType: 'html',
          success: function (e) {
            console.log(e);
            if(e == "превышено"){
                $("#result_price").html("Недопустимое количество артикулов");
                $(".art_count").css("color", "red");
            }
            $(".art_count").html(e);
            if(e != "превышено"){
                $(".art_count").css("color", "#242424");
            }
            //reset();
          },
          error: function (e) {
            console.log(false);
          }
        });
        return false;
    })

    //чекбоксы для стенок(форма записи)

    /*$(document).on("click", ".record__custom-checkbox", function(e){
        if ($(this).is(':checked')){
            $(this).val(true);
        } else {
            console.log('not checked');
        }
    })*/

    // Рассчет стоимости заказа
    $(document).on("input", "#form2, #form2_1, #form3, #form5", function(e){
        var dataString = $("#form1, #form2, #form2_1, #form3, #form5").serialize();

        $.ajax({
          type: 'post',
          url: '/ajax/price_change.php',
          data: dataString,
          dataType: 'html',
          success: function (e) {
            prices = JSON.parse(e);
            if(prices == 1){
                $("#result_price").html("Выберите артикулы съемки");
                $("#result_price").css("color", "#242424");
            } else if(prices == 2){
                $("#result_price").html("Заполните артикулы");
                $("#result_price").css("color", "#242424");
            } else{
                $("#result_price").html(prices.price);
                $("#result_price").css("color", "#242424");
                $("#odejda_price").html(prices.od_price);
            }
          },
          error: function (e) {
            console.log(false);
          }
        });
        return false;
    })

    // Рассчет стоимости заказа
    $(document).on("change", "#form3", function(e){
        var dataString = $("#form1, #form2, #form2_1, #form3, #form5").serialize();

        $.ajax({
          type: 'post',
          url: '/ajax/price_change.php',
          data: dataString,
          dataType: 'html',
          success: function (e) {
            prices = JSON.parse(e);
            if(prices == 1){
                $("#result_price").html("Выберите предмет съемки");
                $("#result_price").css("color", "#242424");
            } else if(prices == 2){
                $("#result_price").html("Заполните артикулы");
                $("#result_price").css("color", "#242424");
            } else{
                $("#result_price").html(prices.price);
                $("#result_price").css("color", "#242424");
                $("#odejda_price").html(prices.od_price);
            }
          },
          error: function (e) {
            console.log(false);
          }
        });
        return false;
    })

    // радиокнопки фон, форма записи
    /*$(document).on("click", "[name='BG']", function(e){
        if($(this).is(':checked')){
            $("[name='BG']").prop('checked', false);
            $(this).prop('checked', true);
        }
    })*/

    // скрыть фоны, форма записи
    /*$(document).on("click", "#asos", function(e){
        if($(this).is(':checked')){
            $("#form5").css("display", "none");
            $(".record__locations-title").css("display", "none");
            $("[name='BG']").prop('checked', false);
        } else{
            $("#form5").css("display", "flex");
            $(".record__locations-title").css("display", "block");
            $('#color-14').prop('checked', true);
        }
    })*/

    // Личный кабинет

    // забыли пароль
    $(".restore-modal__form").on("submit", function(e){
        var data = $(this).serialize();
        $.ajax({
          type: 'post',
          url: '/ajax/profile/pass_change.php',
          data: data,
          dataType: 'html',
          success: function (e) {
            console.log(true);
            console.log(e);
            $(".restore-modal").removeClass("active");
            $(".ajax_title").html("Новые данные отправлены вам на почту");
            $(".tt-modal").addClass('active');
          },
          error: function (e) {
            console.log(false);
          }
        });
        return false;
    })

    // Предоплата через ЛК

    $(document).on("click", ".prepayment-ajax", function(){
        var data = { "ORDER_ID" : $(this).data("id")};
        console.log(data);
        $.ajax({
          type: 'post',
          url: '/ajax/prepayment.php',
          data: data,
          dataType: 'html',
          success: function (e) {
            console.log(e);
            if(e == "error"){
                alert("Что-то пошло не так, попробуйте позже");
            } else{
                window.location.href = e;
            }
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
        return false;
    })

    // Оплата
    $(document).on("click", ".payment-ajax", function(){
        var data = { "ORDER_ID" : $(this).data("id")};
        console.log(data);
        $.ajax({
          type: 'post',
          url: '/ajax/payment.php',
          data: data,
          dataType: 'html',
          success: function (e) {
            console.log(e);
            if(e == "error"){
                alert("Что-то пошло не так, попробуйте позже");
            } else{
                window.location.href = e;
            }
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
        return false;
    })

    $(".modal-cancel").on("click", ".ajax_cancel", function(){

        let data = {
            order_id: $(this).data("id")
        };
        console.log(data);

        $.ajax({
          type: 'post',
          url: '/ajax/cancel_order.php',
          data: data,
          dataType: 'json',
          success: function (e) {
            console.log(e)
            if(e.response == "success"){
                $(".order_status").text(e.data.status);
                $(".order-detail_bottom").html("");
                $(".change-order__ajax").prop("disabled", true);
                //window.location.reload();
            }
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });

    })

    //"REASON": $(".cancel-form").serializeArray(),

    // ТЗ

    $(document).on("click", ".add-ts", function(){

        data ={
            ORDER_ID: $(this).data("order"),
            ACTION: "create-ts"
        }

        $.ajax({
          type: 'post',
          url: '/ajax/ts/ts.php',
          data: data,
          dataType: 'json',
          success: function (e) {
            if(e.response == "success"){
                window.location.href = e.data.URL;
            }
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
        
    })

    // new article
    $(".tz--adding-article").on("click", ".save-article", function(){

        var formData = new FormData();
        var formData = new FormData($('.tz_form').get(0));
        formData.append("ACTION", "add-article");

        let checkboxValues = [];

        $("#ts-form").find("[name='checkbox']:checked").each(function(){
            checkboxValues.push($(this).val());
        })

        formData.append("VIDEO", checkboxValues);

        console.log(formData);

        $.ajax({
          type: 'post',
          url: '/ajax/ts/ts.php',
          data: formData,
          processData: false,
          contentType: false,
          dataType: 'json',
          success: function (e) {
            console.log(e);
            url = $(".go-back-link").attr("href");
            window.location.href = url;
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
        
    })

    //edit article 

    $(".tz--adding-article").on("click", ".edit-article", function(){
        var formData = new FormData();
        var formData = new FormData($('.tz_form').get(0));
        

        let checkboxValues = [];

        $("#ts-form").find("[name='checkbox']:checked").each(function(){
            checkboxValues.push($(this).val());
        })
        formData.append("ACTION", "edit-article");
        formData.append("VIDEO", checkboxValues);
        formData.append("ELEMENT_ID", $(this).data("id"));

        console.log(formData);

        $.ajax({
          type: 'post',
          url: '/ajax/ts/ts.php',
          data: formData,
          processData: false,
          contentType: false,
          dataType: 'json',
          success: function (e) {
            console.log(e);
            url = $(".go-back-link").attr("href");
            window.location.href = url;
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
    })

    $(".subject_photo").on("click", ".remove-button", function(){
        $(this).closest("#ts-form").find("[name='DELETE_SUBJECT_PHOTO']").val("delete");
    })

    $(".subject_photo").on("input", "[name='SUBJECT_PHOTO']", function(){
        console.log($(this));
        $("[name='DELETE_SUBJECT_PHOTO']").val("");
    })

    $(".look_photo").on("click", ".remove-button", function(){
        $(this).closest("#ts-form").find("[name='DELETE_LOOK_PHOTO']").val("delete");
    })

    $(".look_photo").on("input", "[name='LOOK_PHOTO']", function(){
        $("[name='DELETE_LOOK_PHOTO']").val("");
    })

    // $(".tz").on("click", ".change_article", function(){
    //     console.log($(this).data("article"));
    // })

    $(".tz").on("click", ".delete_article", function(){
        console.log($(this).data("article"));
        data = {
            ID: $(this).data("article"),
            ACTION: "delete-article"
        }

        let container = $(this).parents(".tz_article");

        $.ajax({
          type: 'post',
          url: '/ajax/ts/ts.php',
          data: data,
          dataType: 'json',
          success: function (e) {
            if(e.response == "success"){
                window.location.reload();
            }
            console.log(e);
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
    })

    
    // Изменить заказ
    $(".order-detail").on("click", ".change-order__ajax", function(){
        data = {
            ORDER_ID: $(this).data("id"),
            PRESENCE: $(".presence").find(".active").data("value"),
            TS: $(".ts").find(".active").data("value")
        }
        
        $.ajax({
          type: 'post',
          url: '/ajax/profile/change-order.php',
          data: data,
          dataType: 'json',
          success: function (e) {
            console.log(e);
            
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
    })

    // Отправить файл с ТЗ
    $(".tz").on("click", ".save_file-ajax", function(){

        let order_id = $(this).data("id");
        data = {
            TS_DATA: $(".tz_form").serializeArray(),
            ORDER_ID: order_id,
        }
        console.log(data);
        $.ajax({
          type: 'post',
          url: '/ajax/ts/create_tz-file.php',
          data: data,
          dataType: 'json',
          success: function (e) {
            console.log(e);
            if(e.result.SUCCESS){

                window.location.href = "/cabinet/order/" + order_id + "/"
            }
            
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
    })

    // chat

    $(".request-create").on("click", ".load__problems", function(){
        let sectionId = $(this).parents(".request-create__step-1").find(".request-create_dropdown__list").find("li.active").data("section");
        data = {
            SECTION: sectionId
        }
        $.ajax({
          type: 'post',
          url: '/ajax/profile/problems.php',
          data: data,
          dataType: 'html',
          success: function (e) {
            if(e){
                $(".request-create__step-2").find(".request-create_dropdown__list").html(e);
            }
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
    })

    $(".request-create").on("click", ".create-chat", function(){

        $(".chat__msgs").html("");

        var formData = new FormData($('#chat_creation-file').get(0));
        formData.append("type", "send_message");
        formData.append("ORDER_ID", $(this).parents(".request-create__step-2").find("[name='ORDER_ID']").val());
        formData.append("USER_ID", $(this).data("user"));
        formData.append("SUBJECT", $(this).parents(".request-create__step-2").find(".request-create_dropdown__list").find("li.active").data("value"));

        $.ajax({
          type: 'post',
          url: '/ajax/OL1/ajax.php',
          data: formData,
          processData: false,
          contentType: false,
          dataType: 'json',
          success: function (e) {
            console.log(e);
            $("[name='CHAT_FILE']").val("");
            $(".chat-send__ajax").attr("data-chat", e.chat);
            $(".request_list").prepend(e.appealElement);
              $(".request_list .open-chat").eq(0).on("click", ".open-chat", function(){



                  let requestNum = $(this).parents(".request_item").find(".req_num").text();
                  let chatID = $(this).data("id");

                  data = {
                      CHAT_ID: chatID,
                      type: 'chat_history'
                  }
                  console.log(data);
                  $(".chat__msgs").html("");

                  $.ajax({
                      type: 'post',
                      url: '/ajax/OL1/ajax.php',
                      data: data,
                      dataType: 'json',
                      success: function (e) {
                          console.log(e);
                          if(e.response == "success"){
                              $(".request-num").html("Заявка №" + requestNum);
                              $(".chat__msgs").append(e.string);
                              $(".chat-send__ajax").attr("data-chat", chatID);
                          } else{
                              alert("Ошибка! Не удалось загрузить чат.");
                          }

                      },
                      error: function (e) {
                          alert("Что-то пошло не так, попробуйте позже");
                          console.log(false);
                      }
                  });
              })
            $('.chat__input input').val('').removeData('file-info');
            $('.file-info').remove();
            selectedFile = null;
            console.log('try')
              $(".personal__tab-content_box.request").removeClass("active").hide();
              $(".personal__tab-content_box.chat").addClass("active").fadeIn(200);
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
    })

    $(".request_list").on("click", ".open-chat", function(){
        


        let requestNum = $(this).parents(".request_item").find(".req_num").text();
        let chatID = $(this).data("id");

        data = {
            CHAT_ID: chatID,
            type: 'chat_history'
        }
        console.log(data);
        $(".chat__msgs").html("");

        $.ajax({
          type: 'post',
          url: '/ajax/OL1/ajax.php',
          data: data,
          dataType: 'json',
          success: function (e) {
            console.log(e);
            if(e.response == "success"){
                $(".request-num").html("Заявка №" + requestNum);
                $(".chat__msgs").append(e.string);
                $(".chat-send__ajax").attr("data-chat", chatID);
            } else{
                alert("Ошибка! Не удалось загрузить чат.");
            }
            
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
    })

    $(".request-personal__content").on("click", ".chat-send__ajax", function(e){
        e.preventDefault();
        //var data = new FormData();
        var data = new FormData($('#chat-form').get(0));

        data.append("CHAT_ID", $(this).data("chat"));
        data.append("type", "send_message");

        console.log(data);

        $.ajax({
          type: 'post',
          url: '/ajax/OL1/ajax.php',
          data: data,
          processData: false,
          contentType: false,
          dataType: 'json',
          success: function (e) {
            console.log(e);
            $("[name='FILE']").val("");
            $("[name='MESSAGE']").val("");
            if(e.response == "success"){
               //$(this).parents(".chat__bottom").find('[name="MESSAGE"]').val(""); 
               $(".chat__msgs").append(e.message);
               $('.chat__input input').val('').removeData('file-info');
               $('.file-info').remove();
               selectedFile = null;
            } else{
                
                alert("Ошибка! Не удалось загрузить чат.");
            }
            
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
    })

    // отправить причину отмены заказа
    $(".modal-cancel_reason").on("click", ".send_cancel_feedback", function(){

        let data = $(this).closest(".modal-cancel_reason").find(".cancel-form").serializeArray();
        
        data.push({
            name: "ORDER_ID",
            value: $(this).data("id"),
        })

        data = Object.groupBy(data, ({name}) => name)

        

        console.log(data);

         $.ajax({
          type: 'post',
          url: '/ajax/chatBot/send-cancelReason.php',
          data: data,
          dataType: 'json',
          success: function (e) {
            console.log(e);
            // if(e.response == "success"){
            //    //$(this).parents(".chat__bottom").find('[name="MESSAGE"]').val(""); 
            //    $(".chat__msgs").append(e.string);
            // } else{
                
            //     alert("Ошибка! Не удалось загрузить чат.");
            // }
            
          },
          error: function (e) {
            alert("Что-то пошло не так, попробуйте позже");
            console.log(false);
          }
        });
    })

});