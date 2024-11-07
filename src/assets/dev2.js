$(document).ready( function () {
    console.log(1)
	  $(document).on("click", ".model__like", function(){
        console.log(1)
      let par = this.parentElement;
      console.log($(this).attr("ajax_id"))
      console.log($(this))
      var data = new FormData();
        data.append('ACT', $(this).hasClass('active'));
        data.append('NAME', $(this).attr("ajax_id"));
        $.ajax({
            url: '/ajax/profile/favour.php',
            type: "POST",
            dataType : "json",
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            success: function (data) {
                console.log($(par).parents(".personal").length)
                if($(par).parents(".personal").length > 0){
                    let modelCard = $(par).closest(".model-wrapper");
                    modelCard.remove();
                }
                console.log(data);
                console.log(true);
            },
            error:function(data){
                console.log(data);
                console.log(false);
                            }
        });
    });
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
    $('.record__custom-checkbox.ajax').change(function() {
        let data = new FormData();
        data.append('ACTION', $(this).is(":checked"))
        data.append('NOTE',$(this).attr('ajax_check'))
        data.append('ID',$(this).attr('ajax__id'))
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