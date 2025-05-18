 let list = [];
   
         addList() {
            const name = document.getElementById('nameInput').value;
            const age = document.getElementById('ageInput').value;
            const hobby = document.getElementById('hobbyInput').value;

            list = [...list, { name, age, hobby }];
            console.log(list);
            alert('List updated! Check console for details.');
        }

