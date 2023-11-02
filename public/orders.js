let mybtn = document.querySelectorAll(".Rmove_data");
mybtn.forEach(item => {item.addEventListener("click" , deletDatabase);

    function deletDatabase(event) {
        let btn = event.target;
        let btn_id = btn.getAttribute("data-id");

        fetch(`/delet/${btn_id} `,{ method: "DELETE" } )
            .then((response)=> response.json())
            .then((data)=> console.log(data) )
            .catch((err)=> {console.log(err);
         } );
    }
});
