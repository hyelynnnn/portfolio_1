package com.ezen.grrreung.web.member.controller;
import com.ezen.grrreung.domain.member.dto.Member;
import com.ezen.grrreung.domain.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/grrreung")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    /**
     * 로그인 화면 요청
     */
    @GetMapping("/login")
    public String loginForm() {
        return "grrreung/sub/login";
    }

    /**
     * 로그인 처리 요청
     */
    @PostMapping("/login")
    public String login(@RequestParam("memberId") String memberId,
                        @RequestParam("password") String password) {
        log.info("수신한 회원 아이디 : {}", memberId);
        log.info("수신한 회원 비밀번호 : {}", password);
        memberService.login(memberId, password);
        if (memberId != null && password != null) {
                return "redirect:/";
        } else {
            return "grrreung/sub/login";
        }
    }

    /**
     * 회원 가입 화면 요청
     */
    @GetMapping("/register")
    public String registerForm() {
        return "/grrreung/sub/register";
    }

    /**
     * 회원 가입 처리 요청
     */
    @PostMapping("/register")
    public String register(@ModelAttribute("member") Member member) {
        log.info("수신한 회원 정보 : {}", member.toString());
        memberService.register(member);
        return "redirect:/grrreung/result";
    }

    /**
     * 회원가입 결과 페이지
     */
    @GetMapping("/result")
    public String resultForm() {
        return "/grrreung/sub/result";
    }


    /**
     * 회원가입 상세 정보
     */
    @GetMapping("/mypage/{memberId}")
    public String info(@PathVariable String memberId, Model model){
        Member member = memberService.memberInfo(memberId);
        model.addAttribute("member", member);
        return "/grrreung/sub/mypage";
    }

    /**
     * 회원가입 수정
     */
    @GetMapping("/update/{memberId}")
    public String update(@PathVariable String memberId, Model model){
        Member member = memberService.memberInfo(memberId);
        model.addAttribute("member", member);
        return "/grrreung/sub/";
    }

    /**
     * 회원가입 수정 처리
     */
    @PostMapping("/update/{memberId}")
    public String update(@ModelAttribute("member") Member member) {
        memberService.updateInfo(member);
        return "redirect:/grrreung/sub/mypage";
    }



}