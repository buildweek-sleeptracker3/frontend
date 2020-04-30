import styled from 'styled-components'

export const StyledNav = styled.nav`

display: flex;

justify-content: space-between;
background: #272727;
padding: 0 2%;

button {
    margin: 2% 4%;
    padding: 2% 4%;
    // height: 30px;
    // width: 100px;
    border-radius: 5px;
    font-size: 1rem;
    color: #a9a9a9;
    background: #272727;
    border: 1px solid #a9a9a9;

    &:hover{
        background: #a9a9a9;
        color: #272727;
    }
}

.buttons {
    display: flex;
    width: 30%;
    align-items: center;
    justify-content: flex-end;
}
.logo {
    color: #e3e3e3;
}

`