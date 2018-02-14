<html>

<?php include("../includes/head.class.php"); ?>

<?php include("../includes/header.class.php"); ?>

<script>
    function checkForm(form)
    {
        if((form.user_name.value.length) == 0)
        {
            alert("Please enter your name");
            return(false);
        }
        if(!checkSex(form.sex))
            return(false);
        if(!checkBirthday(form.user_birthday.value))
            return(false);
        if((form.user_id.value.length) == 0)
        {
            alert("User ID");
            return(false);
        }
        if(!checkPassWord(form.user_pw, form.user_pwc))
        {
            return(false);
        }
        if(!checkEmail(form.user_email.value))
        {
            return(false);	
        }
        if((form.user_add.value.length) == 0)
        {
            alert("Address");
            return(false);
        }
        if((form.user_mobile.value.length) != 10)
        {
            alert("Error：wrong number");
            return(false);
        }
        if(!checkLic(form.user_licenseNum.value))
            return(false);
        alert("successfuly！");
        form.submit();
        return(true);
    }
    
    function checkSex(sex)
    {
        for(i=0; i<sex.length; i++)
        {
            if(sex[i].checked)
                return(true);
            alert("SEX");
            return(false);
        }
    }
    
    function checkBirthday(day)
    {
        index = day.indexOf('-', 0);
        index2 = day.indexOf('-', 5);
        if(day.length == 0)
        {
            alert("Birth");
            return(false);
        }
        else if((index != 4) || (index2 != 7) || (day.length != 10))
        {
            alert("Error：EX:1993-01-01");
            return(false);
        }
        else
            return(true);
    }
    
    function checkEmail(email)
    {
	   index = email.indexOf ('@', 0);		// 尋找 @ 的位置，0 代表開始尋找的起始位置
	   if (email.length==0) {
		  alert("Email!");
		  return (false);
	   } 
        else if (index==-1) {
		  alert("錯誤：必須包含「@」。");
		  return (false);
	   } 
        else if (index==0) {
		  alert("錯誤：「@」之前不可為空字串。");
		  return (false);
	   } 
        else if (index==email.length-1) {
		  alert("錯誤：「@」之後不可為空字串。");
		  return (false);
	   } 
        else
		  return (true);
    }
    function checkPassWord(pw, pwc)
    {
        if(pw.length == 0)
        {
            alert("password");
        }
        else if(pw.value.length < 5)
        {
            alert("錯誤：密碼長度須大於5個字元");
            return(false);
        }
        else if(pw.value != pwc.value)
        {
            alert("錯誤：兩次密碼輸入不相同");
            return(false);
        }
        else
            return(true);
    }
    function checkLic(lic)
    {
        index = lic.indexOf('-', 0);
        if(lic.length == 0)
        {
            alert("請輸入車牌號碼");
            return(false);
        }
        else if((index < 0) || (index == lic.length -1) || (index > 4) || ((lic.length) > 8))
        {
            alert("無效車牌");
            return(false);
        }
        else
            return(true);
    }
</script>

Information：<hr><p>
<form action="register_member.php">
Name：<input name="user_name" type="text" size="25"><br>
                    SEX：<input name="sex" type="radio" value="1">M <input name="sex" type="radio" value="0">F<br>
                    Birth：<input name="user_birthday" type="date" placeholder="yyyy-mm-dd" size="10"><br>
                    User ID：<input name="user_id" type="text"><br>
                    Password：<input name=user_pw type="password" placeholder="請輸入長度大於5字元密碼">
                    Confirm Password：<input name="user_pwc" type="password"><br>
                    E-mail：<input name="user_email" type="email" placeholder="example@o365.mcut.edu.tw" size="30"><br>
                    Address：<input name="user_add" type="text" size="30"><br>
                    Phone Number：<input name="user_mobile" type="text" placeholder="09xxxxxxxx"><br>
                  <!--車牌號碼：</th><th><input name="user_licenseNum" type="text" size="10" placeholder="AAA-1234"><br>-->
<p><input type=button VALUE="註冊" onClick="checkForm(this.form)"><button type="reset">清除資料</button>
</form>

<hr>
<?php include("../includes/footer.class.php"); ?>
</html>