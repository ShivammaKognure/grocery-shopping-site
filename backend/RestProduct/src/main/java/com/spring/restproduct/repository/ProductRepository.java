package com.spring.restproduct.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.restproduct.model.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel,Long>{

	
}
