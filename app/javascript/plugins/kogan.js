const koganStock = () => {
  const input = document.getElementById("endpoint");
  input.addEventListener("change", e => {
    if (e.target.value) {
      const url = `http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/${e.target.value}`;

      fetch(url)
        .then(response => response.json())
        .then((data) => {
          const size = data.objects.map(e => {
            if(e["category"] === "Air Conditioners"){
              const mult = (e.size.height/100 * e.size.length/100 * e.size.width/100)*250;
              return mult;
            } else {
              return 0;
            };
          });

          const filterArr = size.filter(c => c > 0);
          const totalWeight = size.reduce((a,b) => a + b , 0);
          const averageWeight = Math.round(totalWeight/filterArr.length);
          if(averageWeight){
            document.getElementById("result").innerHTML =  "Average cubic weight for Air Conditioners category: "+ averageWeight + " Kg";
          } else {
            document.getElementById("result").innerHTML =  "No items found";
          }
        });
    };
  });
};

export {koganStock};



