package com.ezen.grrreung.domain.cart.mapper;

import com.ezen.grrreung.domain.cart.dto.Cart;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface CartMapper {

    /**
     * 장바구니 상품 리스트
     */
    public List<Map<String, Object>> findById(String memberId);

    // 장바구니 상품 추가
    public void insertItemToCart(Cart cart);

    // 선택된 장바구니 상품 리스트
    public List<Map<String, Object>> findByItemId(Map<String, Object> map);


}