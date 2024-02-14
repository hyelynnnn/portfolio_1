-- CREATE BOARD ---------------------------------

CREATE TABLE notice (
    noti_code  INT AUTO_INCREMENT NOT NULL,
    noti_title VARCHAR(500) NOT NULL,
    noti_cont  VARCHAR(500) NOT NULL,
    noti_date  DATETIME DEFAULT CURRENT_TIMESTAMP,
    noti_auth  VARCHAR(30) DEFAULT 'grrreng',
    PRIMARY KEY (noti_code)
);

-- notice 임시데이터
insert into notice ( noti_title, noti_cont)
values( '공지사항테스트제목', '공지사항테스트내용공지사항테스트내용공지사항테스트내용공지사항테스트내용공지사항테스트내용공지사항테스트내용공지사항테스트내용공지사항테스트내용공지사항테스트내용공지사항테스트내용공지사항테스트내용');

select * from notice;

CREATE TABLE item_qna (
    qna_code   INT AUTO_INCREMENT NOT NULL,
    item_id    INT NOT NULL,
    qna_title  VARCHAR(100) NOT NULL,
    qna_cont   VARCHAR(500) NOT NULL,
    qna_date   DATETIME DEFAULT CURRENT_TIMESTAMP,
    member_id  VARCHAR(30) NOT NULL,
    PRIMARY KEY (qna_code)
);

INSERT INTO item_qna (
    qna_code,
    item_id,
    qna_title,
    qna_cont,
    member_id
) VALUES (
    null,
    01,
    '상품문의 테스트 제목',
    '상품문의 테스트 내용 입니다',
    'customer1'
);

CREATE TABLE item_rev (
    rev_code    INT AUTO_INCREMENT NOT NULL,
    item_id     INT NOT NULL,
    rev_title   VARCHAR(100) NOT NULL,
    rev_cont    VARCHAR(500) NOT NULL,
    rev_date    DATETIME DEFAULT CURRENT_TIMESTAMP,
    member_id   VARCHAR(30) NOT NULL,
    image_path  VARCHAR(255),
    PRIMARY KEY (rev_code)
);

INSERT INTO item_rev (
    rev_code,
    item_id,
    rev_title,
    rev_cont,
    member_id,
    image_path
) VALUES (
    null,
    01,
    '상품후기 테스트 제목',
    '상품후기 테스트 내용 입니다',
    'customer1',
    'C:\grrreung\shoppingmall-project\review\1705926683305_휴양지1.png'
);

CREATE TABLE item_qna_re (
    re_code  INT AUTO_INCREMENT NOT NULL,
    qna_code INT NOT NULL,
    re_cont  VARCHAR(500) NOT NULL,
    re_date  DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (re_code)
);