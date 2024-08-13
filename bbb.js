const { resolve } = require("path");
const puppeteer = require("puppeteer");

const url = "https://gshow.globo.com/realities/bbb/";

async function main() {
    //Criamos uma instancia de browser 
    const browser = await puppeteer.launch({
        headless: true
    });

    //abriu nova pagina 
    const page = await browser.newPage();

    //navegou ate a URL 
    await page.goto(url);
    console.log("Entrei no site " , url);


    //executou um codigo nela quando a pagina estava pronta , rolou ate o final da pagina 
    const posts = await page.evaluate(async () => {    
        await new Promise(resolve => {
            const distance = 100;
            // window.scrollBy(0 , distance);
            let scrolledAmount = 0;



            const timer = setInterval(() =>{
              window.scrollBy(0 , distance);
              scrolledAmount += distance;


              if (scrolledAmount >= document.body.scrollHeight) {
                clearInterval(timer)
                resolve();
              }
            } , 100)
        })


        //estraiu os posts com esse comando 
     const posts = Array.from(document.querySelectorAll(".post-item"));

     // pra cada post ele usou a API do proprio browser pra inspecionar os elementos e conteudo 
        return data = posts.map((post) => ({
            url: post.querySelector(".post-materia-text__content")?.getAttribute("href"),
            title: post.querySelector(".post-materia-text__title")?.textContent,
            description: post.querySelector(".post-materia-text__description" )?.textContent,        
        }));

        
       });

    await browser.close();
    console.log(posts)  
   
}

main();
