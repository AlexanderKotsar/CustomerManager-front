import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomerService } from './customer.service';
import { Customer } from './customer';

@Component({
   selector: 'app-customer',
   templateUrl: './customer.component.html',
   //styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  //Component properties
   allCustomers: Customer[];
   statusCode: number;
   requestProcessing = false;
   customerIdToUpdate = null;
   processValidation = false;

    //Create form
   customerForm = new FormGroup({
       name: new FormControl('', Validators.required),
       phone: new FormControl('', Validators.required),
       address: new FormControl('', Validators.required)
   });

   //Create constructor to get service instance
   constructor(private customerService: CustomerService) {
   }

   //Create ngOnInit() and load customers
   ngOnInit(): void {
	   this.getAllCustomers();
   }

   //Fetch all customers
   getAllCustomers() {
        this.customerService.getAllCustomers()
		  .subscribe(
                data => this.allCustomers = data,
                errorCode =>  this.statusCode = errorCode);
   }

   //Handle create and update customer
   onCustomerFormSubmit() {
	  this.processValidation = true;
	  if (this.customerForm.invalid) {
	       return; //Validation failed, exit from method.
	  }

	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
	    let name = this.customerForm.get('name').value.trim();
      let phone = this.customerForm.get('phone').value.trim();
      let address = this.customerForm.get('address').value.trim();
	  if (this.customerIdToUpdate === null) {
	    //Handle create customer
	    let customer= new Customer(null, name, phone, address);
	    this.customerService.createCustomer(customer)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllCustomers();
					this.backToCreateCustomer();
			    },
		        errorCode => this.statusCode = errorCode);
	  } else {
   	    //Handle update customer
	    let customer = new Customer(this.customerIdToUpdate, name, phone, address);
	    this.customerService.updateCustomer(customer)
	      .subscribe(successCode => {
            this.statusCode = successCode;
            this.getAllCustomers();
            this.backToCreateCustomer();
			    },
		        errorCode => this.statusCode = errorCode);
	  }
   }

   //Load customer by id to edit
   loadCustomerToEdit(id: string) {
      this.preProcessConfigurations();
      this.customerService.getCustomerById(id)
	      .subscribe(customer => {
		            this.customerIdToUpdate = customer.id;
		            this.customerForm.setValue({ name: customer.name,
                                            phone: customer.phone,
                                            address: customer.address });
					      this.processValidation = true;
					      this.requestProcessing = false;
		        },
		        errorCode =>  this.statusCode = errorCode);
   }

   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;
   }

   //Go back from update to create
   backToCreateCustomer() {
      this.customerIdToUpdate = null;
      this.customerForm.reset();
	  this.processValidation = false;
   }
}
