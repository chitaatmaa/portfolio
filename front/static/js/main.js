document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
        });
    });
});

document.getElementById("sendMessage").addEventListener('click', async function(e) {
    e.preventDefault();

    var uname = document.getElementById("name").value;
    var umail_box = document.getElementById("mail_box").value;
    var utopic = document.getElementById("topic").value;
    var umessage = document.getElementById("message").value;

    // Валидация данных
    if ((!uname) || (!umail_box) || (!utopic) || (!umessage)) {
        alert("Ошибка ввода данных. Заполните все поля");
        return;
    }

    if (uname.length > 50) {
        alert("Превышена длинна имени для обращения.");
        return;
    } else if (!(umail_box.includes('@')) || !(umail_box.includes('.'))) {
        alert("Адрес электронной почты должен иметь формат local_name@domain");
        return;
    } else if (umail_box.length > 64) {
        alert("Превышена длинна адреса электронной почты.");
        return;
    } else if (utopic.length > 50) {
        alert("Превышена длинна темы сообщения.");
        return;
    } else if (umessage.length > 512) {
        alert("Превышена длинна сообщения.");
        return;
    }

    // Отправка данных
    var udata = {
        user_name: uname,
        user_mail: umail_box,
        user_topic: utopic,
        user_message: umessage
    };

    try {
        const response = await fetch('/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(udata)
        });

        if (response.status === 201) {
            alert("Сообщение успешно доставлено! Свяжусь с вами при прочтении, если это будет необходимо.");
        } else {
            const errorText = await response.text();
            alert(errorText || 'Сервер временно недоступен. Попробуйте снова позже.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Сервер временно недоступен. Свяжитесь со мной одним из способов, представленных на странице.');
    }
});