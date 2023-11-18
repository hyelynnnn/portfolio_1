package com.ezen.grrreung.domain.member.service;

import com.ezen.grrreung.domain.member.dto.Member;
import com.ezen.grrreung.domain.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements  MemberService {

    private final MemberMapper memberMapper;

    @Override
    public void register(Member member) {
        memberMapper.create(member);
    }

    @Override
    public void login(Member member) {
        memberMapper.findById(member.getMemberId(), member.getPassword());
    }

    @Override
    public Member getMember(String memberId) {
        return null;
    }

    @Override
    public Member getMemberByEmail(String email) {
        return null;
    }

    @Override
    public Member getMemberByPw(String password) {
        return null;
    }
}
