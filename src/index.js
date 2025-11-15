const axios = require('axios')
const https = require('https')
const cheerio = require('cheerio')
const httpsAgent = new https.Agent({ rejectUnauthorized: false })

/**
 * asynchronous method, get the currency values from the BCV website, the web site update daily
 * @async
 * @method bcvDolar
 * @example <caption> example usage of bcvDolar </caption>
 * dtDolar().then(data=>{console.log(data)})
 * @yields {Promise} Promise object that contains the following propierties '_dolar','_euro','_yuan','_lira','_rublo', all are number type
 */
const bcvDolar = async() => {
        const result=await axios.get('https://bcv.org.ve',{httpsAgent})
        const $ =cheerio.load(result.data)
        const dolar = formato($('#dolar').text())
        const euro  = formato($('#euro').text(),1)
        const yuan  = formato($('#yuan').text(),2)
        const lira  = formato($('#lira').text(),3)
        const rublo  = formato($('#rublo').text(),4)
        return {
            _dolar: dolar,
            _euro: euro,
            _yuan: yuan,
            _lira: lira,
            _rublo: rublo
        }  
        
}

bcvDolar();

/**
 * asynchronous method, get the currency values from the DolarToday website, the web site update daily
 * @async
 * @method dtDolar
 * @example <caption> example usage of dtDolar </caption>
 * dtDolar().then(data=>{console.log(data)})
 * @yields {Promise} Promise object that contains the following propierties '_USD','_EUR','_COL', all are number type
 */
const dtDolar = async()=>{
    const rest= await axios.get('https://s3.amazonaws.com/dolartoday/data.json',{httpsAgent})
    return {
        _USD:rest.data.USD,
        _EUR:rest.data.EUR,
        _COL:rest.data.COL
    }
}
const formato = (str,int=0)=>{
    const monedas = ['USD','EUR','CNY','TRY','RUB']
    const valor=str
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(monedas[int],"")
    .trim()
    .replace(',','.')

    const res=parseFlt(valor)
    return res
    }
const parseFlt = (str,int=2)=>{
    const res=parseFloat(str).toFixed(int)
    return res
    }

    module.exports = {bcvDolar,dtDolar}
