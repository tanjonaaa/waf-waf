const form = document.querySelector("#form");
const container = document.querySelector("#container");
const numberInput = document.querySelector("#number-input");
const ul = document.createElement("ul");
let i = 1;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const number = numberInput.value;
    form.remove();
    container.innerHTML = "";
    requestWhoami(number);
});

const requestWhoami = (number) => {
    container.appendChild(ul);

    function addListItem() {
        if (i <= number) {
            makeCall(i);
            setTimeout(addListItem, 1000);
        }
    }

    addListItem();
};

const makeCall = (i, li) => {
    AwsWafIntegration.fetch("https://api.prod.jcloudify.com/whoami", {
        method: "GET",
    }).
    then(res => {
        if(res.status == 405){
            showMyCaptcha()
        }
    })
}

function captchaExampleErrorFunction(error) {
    /* Do something with the error */
}

const showMyCaptcha = () => {
    AwsWafCaptcha.renderCaptcha(container, {
        apiKey: window.WAF_API_KEY,
        onSuccess: () => {
            requestWhoami(i + 1)
        }
    });
}