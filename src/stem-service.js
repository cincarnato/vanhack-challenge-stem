const axios = require("axios");
const express = require("express");

const createService = () => {
    const app = express();
    const dictionaryURL = "https://raw.githubusercontent.com/qualified/challenge-data/master/words_alpha.txt";

    let words = null
    function getWords() {
        return new Promise((resolve, reject) => {
            if(!words){
                axios.get(dictionaryURL)
                    .then(response => {
                        words = response.data.split("\r\n")
                        resolve(words)
                    })
                    .catch(e => reject(e))
            }else{
                resolve(words)
            }

        })

    }

    /* TODO add your solution here */

    app.get("/", async (req, res) => {
        let words = await getWords()
        let response = {}

        if (req.query.stem) {
            let regex = new RegExp('^'+req.query.stem)
            response = {
                data: words.filter(word => regex.test(word))
            }
        }  else {
            response = {
                data: words
            }
        }
        res.json(response)
    })


    return app; // instead of app.listen
};

module.exports = {createService};
