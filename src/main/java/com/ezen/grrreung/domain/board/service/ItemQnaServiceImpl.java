package com.ezen.grrreung.domain.board.service;

import com.ezen.grrreung.domain.board.dto.ItemQna;
import com.ezen.grrreung.domain.board.dto.ItemRev;
import com.ezen.grrreung.domain.board.mapper.ItemQnaMapper;
import com.ezen.grrreung.web.common.RequestParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ItemQnaServiceImpl implements ItemQnaService{

    private final ItemQnaMapper itemQnaMapper;

    @Autowired
    public ItemQnaServiceImpl(ItemQnaMapper itemQnaMapper) {
        this.itemQnaMapper = itemQnaMapper;
    }

    // QNA 작성
    @Override
    public void posting(ItemQna itemQna) {
        itemQnaMapper.create(itemQna);
    }

    // QNA 전체 + 검색 리스트
    @Override
    public List<ItemQna> postList(RequestParams params) {
        return itemQnaMapper.postList(params);
    }

    // QNA 리스트 행갯수
    @Override
    public int postListCount(RequestParams params) {
        return itemQnaMapper.postListCount(params);
    }

    // QNA 상세 보기
    @Override
    public ItemQna postInfo(int qnaCode) {
        return itemQnaMapper.findByBno(qnaCode);
    }

    // QNA 삭제
    @Override
    public void deletePost(int qnaCode) { itemQnaMapper.deletePost(qnaCode); }

    // QNA 수정
    @Override
    public void updatePost(ItemQna itemQna) { itemQnaMapper.updateByBno(itemQna); }

}
