const koganStock = () => {
  // getting the input from the view
  const input = document.getElementById("endpoint");
  input.addEventListener("change", e => {
    if (e.target.value) {
      // defining dinamic API
      const url = `http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/${e.target.value}`;
      //fetching data from the API
      fetch(url)
        .then(response => response.json())
        .then((data) => {
          const cubicWeight = data.objects.map(e => {
            if(e["category"] === "Air Conditioners"){
              return (e.size.height/100 * e.size.length/100 * e.size.width/100)*250;
            } else {
              return 0;
            };
          });
          // filtering integers from the array
          const filterArr = cubicWeight.filter(e => e > 0);
          // adding all the element from the array
          const totalWeight = cubicWeight.reduce((a,b) => a + b , 0);
          // rounding result to the first decimal
          const averageWeight = Math.round(totalWeight/filterArr.length*10)/10;

          // giving the output in the view
          if(averageWeight){
            document.getElementById("result").innerHTML =  "Average cubic weight for Air Conditioners category: "+ averageWeight + " Kg";
          } else {
            document.getElementById("result").innerHTML =  "There  are no items in the Air Conditioners category";
          }
        });
    };
  });
};

export {koganStock};



