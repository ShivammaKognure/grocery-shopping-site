package com.spring.restproduct.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.restproduct.model.ProductModel;
import com.spring.restproduct.repository.ProductRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class ProductController {
	
	@Autowired
	ProductRepository pr;

	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody ProductModel productModel){
		ProductModel product= pr.save(productModel);
		return ResponseEntity.status(HttpStatus.CREATED)
								.header("status", "Product created")
								.body("product saved");
		
	}
	
	
	@GetMapping("/products")
	public ResponseEntity<?> getProducts(){
		List<ProductModel> products= pr.findAll();
		return ResponseEntity.status(HttpStatus.OK)
								.header("status", "data fetched")
								.body(products);
	}
	
	@DeleteMapping("/products/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable Long id){
		boolean status = pr.existsById(id);
		if(status) {
			pr.deleteById(id);
			return ResponseEntity.noContent().build();
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					   .header("status", "Data Not Found")
					   .body("Data not present with id "+id);
		}
		
	
	}
}
