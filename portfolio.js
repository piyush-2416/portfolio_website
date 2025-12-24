   function openSidebar() {
      document.getElementById("sidebar").style.left = "0px";
    }
  
    function  closeSidebar() {
      document.getElementById("sidebar").style.left = "-200px";
    } 
 document.getElementsByClassName("nav-services").addEventListener("click", () => {
  document.getElementsByClassName("service-box1").scrollIntoView({ behavior: "smooth" });
});
 
