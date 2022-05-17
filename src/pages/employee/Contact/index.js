import React from 'react';
import MobileContainer from 'components/MobileContainer';
import Spacer from 'components/Spacer';
import Icon from 'components/Icon';
import {
  ListBlock,
  ListItem,
  ListItemText,
  SocialContainer,
  SocialItem,
  Note,
  Title,
  Name,
  Link,
  Text,
  SocialHeading
} from '../../track/Contact/style';

const data = [
  {
    id: 1,
    title: 'Headquarters',
    data: [
      { id: 1, icon: 'location', name: 'Pit Pay Inc. Charlotte, NC' },
      {
        id: 2,
        icon: 'mail',
        name: 'info@PitPay.com',
        link: 'mailto:info@PitPay.com'
      },
      { id: 3, icon: 'phone', name: '(855) 748-7291', link: 'tel:8557487291' }
    ]
  },
  {
    id: 2,
    title: 'Support',
    data: [
      {
        id: 1,
        icon: 'mail',
        name: 'Support@PitPay.com',
        link: 'mailto:Support@PitPay.com'
      },
      { id: 2, icon: 'phone', name: '(855) 748-7292', link: 'tel:8557487292' }
    ]
  },
  {
    id: 3,
    title: 'Business Inquires',
    data: [
      {
        id: 1,
        icon: 'mail',
        name: 'Partners@PitPay.com',
        link: 'mailto:Partners@PitPay.com'
      },
      {
        id: 2,
        icon: 'phone',
        name: '(704) 428-9020',
        link: 'tel:7044289020'
      }
    ]
  }
];

const FAQMobile = props => {
  return (
    <div>
      <Spacer size={10} />
      <MobileContainer background="transparent" padding="20px 20px 0 20px">
        <Title>Get In Touch</Title>
      </MobileContainer>
      <Spacer size={28} />
      <MobileContainer background="transparent" padding="0 20px">
        {data.map((item, index) => (
          <ListBlock
            key={item.id}
            style={index + 1 === data.length ? { marginBottom: 0 } : null}
          >
            <Name>{item.title}</Name>
            <Spacer size={10} />

            {item.data.map((subItem, index) => (
              <ListItem key={subItem.id}>
                <div>
                  <Icon icon={subItem.icon} size={22} color="black" />
                </div>
                <ListItemText>
                  {subItem.link ? (
                    <Link href={subItem.link}>
                      {subItem.name}
                      {subItem.icon === 'phone' ? (
                        <Note>Text or Call</Note>
                      ) : null}
                    </Link>
                  ) : (
                    <Text>
                      {subItem.name}
                      {subItem.icon === 'phone' ? (
                        <Note>Text or Call</Note>
                      ) : null}
                    </Text>
                  )}
                </ListItemText>
              </ListItem>
            ))}
          </ListBlock>
        ))}
      </MobileContainer>
      <div style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 30 }}>
        <SocialHeading>Follow Us</SocialHeading>
        <SocialContainer>
          <React.Fragment>
            <SocialItem
              href="https://www.facebook.com/PitPayApp"
              target="_blank"
            >
              <Icon icon="facebook" size={30} color={'#fff'} />
            </SocialItem>
            <SocialItem
              href="https://www.instagram.com/pitpayapp"
              target="_blank"
            >
              <Icon icon="instagram" size={30} color={'#fff'} />
            </SocialItem>
            <SocialItem href="https://twitter.com/pitpayapp" target="_blank">
              <Icon icon="twitter" size={30} color={'#fff'} />
            </SocialItem>
            <SocialItem
              href="https://www.linkedin.com/company/pitpay"
              target="_blank"
            >
              <Icon icon="linkedin" size={30} color={'#fff'} />
            </SocialItem>
          </React.Fragment>
        </SocialContainer>
      </div>
    </div>
  );
};

export default FAQMobile;
