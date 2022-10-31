


export const convert = ()=>{

      fetch('https://api.apilayer.com/currency_data/live?source=EGP&currencies=USD', {
        method: 'GET',
        headers: {
          apikey: '5lkMeupAowa5M5inZrt198T7QlFZ5GS8',
        }
     }
   );

}
