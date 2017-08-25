import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Customer } from './customer';

@Injectable()
export class CustomerService {

  //URLs for CRUD operations
  allCustomersUrl = "https://customermanager.herokuapp.com/customers";
	customerUrl = "https://customermanager.herokuapp.com/customer";

  // allCustomersUrl = "http://localhost:8080/customers";
	// customerUrl = "http://localhost:8080/customer";

  //Create constructor to get Http instance
	constructor(private http:Http) {
	}

	//Fetch all customers
    getAllCustomers(): Observable<Customer[]> {
        return this.http.get(this.allCustomersUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);
    }

	//Create customer
    createCustomer(customer: Customer):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.customerUrl, customer, options)
               .map(success => success.status)
               .catch(this.handleError);
    }

	//Fetch customer by id
    getCustomerById(id: string): Observable<Customer> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', id);
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.customerUrl, options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }

  //Fetch customer by name
    getCustomerByName(name: string): Observable<Customer> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    // cpParams.set('name', name);
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.allCustomersUrl + '/' + name, options)
          .map(this.extractData)
          .catch(this.handleError);
  }

	//Update customer
    updateCustomer(customer: Customer):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.customerUrl, customer, options)
               .map(success => success.status)
               .catch(this.handleError);
    }

	  private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}
