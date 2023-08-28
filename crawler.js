// get app and collections data from adalo docs
(function(window){
    window.save = function(data){
      if(!data) {
        window.error('Console.save: No data')
        return;
      }
      if(typeof data === "object"){
        data = JSON.stringify(data)
      }
      const blob = new Blob([data], {type: "application/json"})
      const downloadLink = document.createElement("a")
      downloadLink.href = window.URL.createObjectURL(blob)
      downloadLink.download = "data.json"
      downloadLink.click()
    }
  })(window)

const result = {}
const collectionNames = Array.from(document.querySelectorAll("div[class='sc-eCYdqJ LprSq']"))
  .map(row => row.getAttribute("id"))
  .map(row =>{
    if (row.length > 0) {
      const collectionName = row.split("/")[1];
      const appId = row.split("~1")[3];
      const collectionId = row.split("~1")[5].split("/")[0];
      return collectionName + ": https://api.adalo.com/v0/apps/" + appId + "/collections/" + collectionId
    }
    else
      return "\n---\n";
  })
const uniqueCollections = [...new Set(collectionNames)]
uniqueCollections.forEach(function(element) {
    result[element.split(": ")[0]] = element.split(": ")[1]
})
console.save(result)