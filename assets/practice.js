// let number=prompt("Введите число");
// const url='http://numbersapi.com/'+ number+'/';
// let request;
// if(window.XMLHttpRequest)
// {
//     request=new XMLHttpRequest();
// }
// else {
//     request=new ActiveXObject("Microsoft.XMLHTTP");
// }

// request.onreadystatechange = function() {
//     if (request.readyState === XMLHttpRequest.DONE) {
//         if (request.status === 200) {
//             const fact = request.responseText;
//            document.getElementById('test').innerText=fact; 
//         } else {
//             alert('Произошла ошибка при получении данных. Пожалуйста, попробуйте еще раз.');
//         }
//     }
// };

// request.open("Get", url);
// request.send();

document.addEventListener('DOMContentLoaded', async()=>{
    try{
        let number=prompt("Enter a number");
        const url='http://numbersapi.com/'+ number+'/';

        const response=await fetch(url);
        if(!response.ok)
        {
            throw new Error('Произошла ошибка при получении данных');
        }

        const fact=await response.text();
        document.getElementById('test').innerText=fact
    }
    catch(error)
    {
        document.getElementById('test').innerText=error.message;
    }
})