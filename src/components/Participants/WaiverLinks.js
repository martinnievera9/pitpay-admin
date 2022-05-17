/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import {
  RESEND_MINORWAIVER,
  RESEND_PARENTWAIVER,
  useResendMuation,
  useResendMuationParent,
} from './gql';
import { toast } from 'react-toastify';
import Spacer from 'components/Spacer';

const Heading = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8;
`;

const List = styled.ul`
  list-style-position: outside;
  list-style-type: disc;
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;
  text-align: left;
  margin-top: 20px;
`;

const Li = styled.li`
  margin-bottom: 15px;
`;

const LiText = styled(Text)`
  white-space: normal;
  margin-right: 20px;
  font-size: 18px;
`;

const AllPassesButtons = styled.div`
  display: flex;
  flex-direction: column;
  & > :first-child {
    margin-bottom: 12px;
  }

  @media (min-width: 859px) {
    flex-direction: row;
    & > :first-child {
      margin-right: 12px;
      margin-bottom: 0;
    }
  }
`;

export const WaiverLinks = ({ currentUser }) => {
  const theme = useTheme();

  const passId = currentUser.pass_id;
  const name = currentUser.name;
  const minor_firstName = currentUser.first_name;
  const parentsArr = currentUser.parents.slice(-1);
  const parentsObj = JSON.stringify(parentsArr);
  const extractedName = parentsObj.substring(1, parentsObj.length - 1);
  const parentName = extractedName ? JSON.parse(extractedName) : '';
  const parent_firstName = parentName ? parentName.last_name : '';
  const parentFullName = parentName
    ? parentName.first_name + ' ' + parentName.last_name
    : '';
  const minor_fullName = minor_firstName + ' ' + parent_firstName;

  const [mutationResendMinor] = useResendMuation(RESEND_MINORWAIVER);
  const handledResendMinor = () => {
    mutationResendMinor({
      variables: {
        pass_id: parseInt(passId),
      },
    });
    toast.success('Resend link has been sent successfully');
  };

  const [mutationResendParent] = useResendMuationParent(RESEND_PARENTWAIVER);
  const handledResendParent = () => {
    mutationResendParent({
      variables: {
        pass_id: parseInt(passId),
      },
    });
    toast.success('Resend link has been sent successfully');
  };

  return currentUser.waiver_links.length ? (
    <div style={{ marginBottom: 20 }}>
      <Heading>
        <Text type="heading">Missing Signatures From</Text>
      </Heading>
      <List>
        {currentUser.waiver_links.map((link) => (
          <span>
            <Text type="heading">
              {'minor' === link.type ? name : parentFullName}
            </Text>

            <Spacer size={10} />
            <AllPassesButtons
              style={{ justifyContent: 'space-between', marginBottom: '10px' }}
            >
              <span style={{ cursor: 'pointer' }}>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{
                    float: 'right',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: 18,
                    padding: '10px',
                    borderRadius: '5px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.primary,
                  }}
                >
                  <span
                    onClick={() =>
                      link.type === 'minor'
                        ? handledResendMinor()
                        : handledResendParent()
                    }
                  >
                    Resend Waiver Links
                  </span>
                </a>
              </span>
              <a
                href={`${link.link}`}
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  float: 'left',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: 18,
                  padding: '10px',
                  borderRadius: '5px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.colors.primary,
                }}
              >
                Open Waiver link
              </a>
            </AllPassesButtons>
            <span>Will Receive Via Text and Email</span>
          </span>
        ))}
      </List>
    </div>
  ) : null;
};
