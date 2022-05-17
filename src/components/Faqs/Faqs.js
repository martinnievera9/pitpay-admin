import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Accordion from 'components/Accordion';
import { H3 } from 'components/Heading';
import Loading from 'components/Loading';
import MobileContainer from 'components/MobileContainer';
import Spacer from 'components/Spacer';
import useTheme from 'hooks/useTheme';
import { useGetFaqs } from './gql/useGetFaqs';

export const Faqs = () => {
  const [isActive, setActive] = useState(false);
  const { pathname } = useLocation();
  const isEmployee = pathname.split('/').includes('admin-employee');
  const isTrackFaqsPage = pathname === '/admin-track/faqs';
  const { data, loading } = useGetFaqs(isEmployee ? undefined : 'track');
  const theme = useTheme();

  if (loading) return <Loading />;

  const faqs = (isEmployee ? data?.getEmployeeFaqs : data?.getAdminFaqs) ?? [];

  if (!faqs) return null;

  const toggleHandler = value => {
    if (isActive === value) {
      return setActive(false);
    }

    setActive(value);
  };

  const header = (
    <H3 style={{ color: theme.colors.white }}>
      {isTrackFaqsPage ? 'Frequently Asked Questions' : 'FAQs'}
    </H3>
  );

  const content = faqs.map((faq, index) => (
    <Accordion
      key={faq.id}
      id={faq.id}
      title={faq.question}
      description={faq.answer}
      longDescription={isEmployee ? undefined : faq.answer}
      noBorder={index === 0}
      isActive={isActive === faq.id}
      toggleHandler={toggleHandler}
    />
  ));

  return (
    <div>
      {isTrackFaqsPage && <Spacer size={10} />}
      {isTrackFaqsPage ? (
        <>
          <MobileContainer>{header}</MobileContainer>
          <MobileContainer>{content}</MobileContainer>
        </>
      ) : (
        <MobileContainer>
          {header}
          {content}
        </MobileContainer>
      )}
    </div>
  );
};
Faqs.propTypes = {
  userType: PropTypes.oneOf(['track', 'employee'])
};
