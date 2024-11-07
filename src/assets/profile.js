$(document).ready(function(){

    //авторизация
    $('#auth_form').on('submit', function(){

        var error_label = $('.modal-login__error-login-text');
        console.log(error_label);
        var data = $(this).serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/profile/login.php',
            data: data,
            dataType: 'html',
            success: function (e) {
                console.log(e);
                console.log(true);
                if(e == 'Вы успешно авторизованы') {
                    window.location = '/cabinet/';
                } else {
                   error_label.css('opacity','1');
                }

            },
            error: function (e) {
                console.log(e);
                console.log(false);
            }
        });
        return false;
    })

    //регистрация
    $('#register_form').on('submit', function(){

        //var error_label = $('.modal-login__error-login-text');
        //console.log(error_label);
        $('.modal-login__label-box').removeClass('error');
        var data = $(this).serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/profile/register.php',
            data: data,
            dataType: 'html',
            success: function (e) {
                console.log(e);
                console.log(true);
                if(e == 'Вы успешно зарегистрированны') {
                    window.location = '/cabinet/';
                } else {
                   //error_label.css('opacity','1');
                    console.log(e);
                    array = e.split('<br>');
                    //console.log(array);
                    array.forEach(function(entry) {
                        console.log(entry.split(" ").splice(0,3).join(" "));
                        if(entry == 'Неверное подтверждение пароля.'){
                            el = $('.register_confirm_password').parent().parent();
                            el.find($('.modal-login__label-error-text')).html(entry);
                            el.addClass('error');  
                        }
                        if(entry.split(" ").splice(0,3).join(" ") == 'Пользователь с логином'){
                            el = $('.register_email').parent().parent();
                            el.find($('.modal-login__label-error-text')).html(entry);
                            el.addClass('error');   
                        }
                        if(entry == 'Пароль должен  быть не менее 6 символов длиной.'){
                            el = $('.register_password').parent().parent();
                            el.find($('.modal-login__label-error-text')).html(entry);
                            el.addClass('error');
                        }
                    });
                    console.log('не вышло');
                }

            },
            error: function (e) {
                console.log(e);
                console.log(false);
            }
        });
        return false;
    })

    //выход из аккаунта

    $('.btn-exit').click(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/profile/logout.php',
            data: data,
            dataType: 'html',
            success: function (e) {
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('exchangeName');
                localStorage.removeItem('userID');
                window.location = '/';
            },
            error:function(e){
              console.log(e);
              console.log(false);
            }
        });
        return false;
    })

    // обновить данные о пользователе

	$(document).on('click', '#update-button', function () {
		let data = $('.form__wrap').serialize()
			//console.log(data)
			$.ajax({
                type: 'post',
                url: '/ajax/profile/updateData.php',
                data: data,
                dataType: 'html',
                success: function (data) {
                    console.log(data)
                    //message = "<div>Данные успешно обновлены!</div>";<p class="form__filter-name" style="color: green; ">
                    //        Данные успешно обновлены!
                    //    </p>
                    message = "<p class='form__filter-name' style='color: green;'> Данные успешно обновлены! </p>";    
                    document.getElementById("data-message").innerHTML = message;
                    console.log(message);

                },
                error: function (data) {
                    console.log(data);
                    console.log(false);
                    message = "<p class='form__filter-name' style='color: red;'> Что-то пошло не так! </p>";
                    document.getElementById("data-message").innerHTML = "Test";
                    console.log(message);
                }
            });
            return false;
	})

   

     
	
});