
$(document).ready(function(){
    $('#btn_cadastro_usuario').click(function(){
        $('#msg').hide();
       
        $.ajax({
            url:'/cadastro_usuario',
            method: "get",
            success: function(data){
                $('#acoes').html(data);
                $('#acoes').show();
                $('#view').hide();
                $('#chat').hide();
                $('#dados').hide();
            }
        })
    });
    $('#btn_view').click(function(){
       
        $.ajax({
            url:'/views_user',
            method: "get",
            success:function(data){
                $('#view').show();
                $('#dados').hide();
                $('#acoes').hide();
                $('#chat').hide();
                $('#view').html(data);
                
            }
        })
    });
    
    $('#btn_chat').click(function(){
       
        $.ajax({
            url:'/chat',
            method: "get",
            success:function(data){
                $('#chat').show();
                $('#dados').hide();
                $('#view').hide();
                $('#acoes').hide();
                $('#chat').html(data);
                
            }
        })
    });
    

});
funcaoTeste = function() 
    {
        $.ajax({
            url:'/dados',
            method: "get",
            success:function(data){
                $('#view').show();
                $('#acoes').hide();
                $('#chat').hide();
                $('#dados').html(data);
                
            }
        })
    };