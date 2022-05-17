import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ListBlock = styled.div`
  padding-bottom: 28px;
  margin-bottom: 28px;
  border-bottom: 1px solid #dbdbdd;

  &:last-child {
    border-bottom: none;
  }
`;

export const ListItem = styled.div`
  display: flex;
  padding: 10px 0;
`;

export const ListItemText = styled.div`
  display: flex;
  flex: 1;
  margin-left: 22px;

  a {
    text-decoration: none;
  }
`;

export const Title = styled.h4`
  display: inline;
  color: #00001f;
  font-size: 7.8vw;
  line-height: 28px;
  font-weight: 600;
  font-family: Barlow Condensed;
  text-align: left;
  line-height: 30px;
  margin-right: 25px;

  @media (min-width: 700px) {
    font-size: 24px;
  }
`;

export const Name = styled.h4`
  display: inline;
  color: #00001f;
  line-height: 25px;
  font-weight: 500;
  text-align: left;
  font-size: 6vw;
  font-weight: 500;

  @media (min-width: 700px) {
    font-size: 22px;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  display: inline;
  color: #727279;
  font-size: 5.4vw;
  line-height: 24px;
  font-weight: 400;
  text-align: left;

  @media (min-width: 700px) {
    font-size: 20px;
  }
`;

export const Text = styled.p`
  text-decoration: none;
  display: inline;
  color: #727279;
  font-size: 5.4vw;
  line-height: 24px;
  font-weight: 400;
  text-align: left;

  @media (min-width: 700px) {
    font-size: 20px;
  }
`;

export const SocialContainer = styled.div`
  padding: 20;
  margin: 0 -10px;
  display: flex;
`;

export const SocialItem = styled.a`
  padding: 10px;
  border-radius: 4px;
  background-color: #fa4616;
  margin: 10px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  display: flex;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Note = styled.span`
  color: #00001f;
  margin-left: 10px;
  font-size: 4.2vw;
  font-weight: 700;

  @media (min-width: 700px) {
    font-size: 15px;
  }
`;

export const SocialHeading = styled.p`
  display: inline;
  color: rgb(0, 0, 31);
  text-align: left;
  font-size: 6vw;
  font-weight: 500;
  line-height: 25px;

  @media (min-width: 700px) {
    font-size: 22px;
  }
`;
