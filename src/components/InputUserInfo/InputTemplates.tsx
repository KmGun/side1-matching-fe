import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { userInfoDataAtom } from "../../atoms";
import {produce} from "immer";
import {useForm} from 'react-hook-form';
import { IdefaultUserInfos, TdefaultEssInput } from "../../allUserInfo";
import { stringify } from "querystring";


const Header = styled.h1`
    color:tomato;
`

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`
const NextPageBtn = styled.button`
    position:absolute;
    right:0;top:50%;
    background-color: tomato;
`
const Input = styled.input`
    width:250px;
    height:40px;
    position: absolute;
    bottom:300px;
`



function InputEssInputTemplate(essInput : TdefaultEssInput ,regExp : RegExp,regExpErrMessage : string ,nextInfo : string){
    interface Iform {
        [key : string] : TdefaultEssInput;    
    } 
    const navigate = useNavigate();
    const {register,watch, handleSubmit, formState : {errors}, setValue} = useForm<Iform>();
    const [userInfoData,setUserInfoData] = useRecoilState(userInfoDataAtom);
    const onValid = (data : Iform) => {
        const currentValue = data[essInput]
        setUserInfoData(current => {
            navigate(`/auth/InputUserInfo/${nextInfo}`)
            return produce(current,(draft) => {
                draft.name = currentValue;
                return draft;
            })
        })
    }
    return (
        <Wrapper>
            <Header>name</Header>
            <form onSubmit={handleSubmit(onValid)}>
                <Input {...register(`${essInput}`,{required : true , pattern : {value : regExp , message : regExpErrMessage}})} placeholder={`input your ${essInput}`} />
                <NextPageBtn>다음 페이지로</NextPageBtn>
                <span>{errors?.essInput?.message}</span>
            </form>
        </Wrapper>
    )
}




function InputNotEssTemplate(){

    return (
        <Wrapper>
            <Header>name</Header>
            <NextPageBtn>다음 페이지로</NextPageBtn>
            <Input placeholder="이름을 입력하세요"></Input>
        </Wrapper>
    )
}












export function InputName(){
    const nameInput = useRef<HTMLInputElement>(null);
    const [userInfoData,setUserInfoData] = useRecoilState(userInfoDataAtom);
    const navigate = useNavigate();

    const onClickNextPageBtn = () => {
        const userName = nameInput.current?.value;
        const stringRegExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
        if (userName && stringRegExp.test(userName)){
            setUserInfoData(current => {
                navigate('/auth/InputUserInfo/age')
                return produce(current,(draft) => {
                    draft.name = userName;
                    return draft;
                })
            })
        } else {
            alert('이름을 한/영 형식으로 입력해주세요.')
            nameInput.current?.focus();
        }
    }
    return(
        <Wrapper>
            <Header>name</Header>
                <NextPageBtn onClick={onClickNextPageBtn}>다음 페이지로</NextPageBtn>
            <Input ref={nameInput} placeholder="이름을 입력하세요"></Input>
        </Wrapper>
    );
}

export function InputAge(){
    const ageInput = useRef<HTMLInputElement>(null);
    const userAge = ageInput.current?.value;
    const [userInfoData,setUserInfoData] = useRecoilState(userInfoDataAtom);
    const navigate = useNavigate();

    const onClickNextBtn = ()=> {
        const userAge = ageInput.current?.value;
        const numberRegExp = /[0-9]/g;
        if (userAge && numberRegExp.test(userAge)){
            setUserInfoData(current => {
                navigate('/matching') 
                return produce(current,(draft) => {
                    draft.age = +userAge;
                    return draft;
                })
            })
        } else  {
            alert('나이를 숫자 형식으로만 입력해 주세요')
            ageInput.current?.focus();
        }
    }
    
    return(
        <Wrapper>
            <Header>age</Header>
                <NextPageBtn onClick={onClickNextBtn}>다음 페이지로</NextPageBtn>
            <Input ref={ageInput} placeholder="나이를 입력하세요"></Input>
        </Wrapper>
    );
}



