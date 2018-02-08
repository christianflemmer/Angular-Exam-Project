import { FormControl } from '@angular/forms';

export class TodoValidators{

    static limitChars(){

        return function(control: FormControl){
            if(control.value.match(/[^a-zA-Z0-9 '-]/)) {
                    console.log("Error with validator");
                    return {'limitError': true}
            }
        }
    }

}