import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Accordion from 'components/Accordion';
import { H3 } from 'components/Heading';
import Loading from 'components/Loading';
import MobileContainer from 'components/MobileContainer';
import Spacer from 'components/Spacer';
import useTheme from 'hooks/useTheme';
import { useGetNotes } from './gql/useGetNotes';

export const Notes = () => {
  const [isActive, setActive] = useState(false);
  const { pathname } = useLocation();
  const isEmployee = pathname.split('/').includes('admin-employee');
  const isTrackNotesPage = pathname === '/admin-track/notes';
  const { data, loading } = useGetNotes(isEmployee ? undefined : 'track');
  const theme = useTheme();

  if (loading) return <Loading />;

  const notes = (isEmployee ? data?.getEmployeeNotes : data?.getAdminNotes) ?? [];

  if (!notes) return null;

  const toggleHandler = value => {
    if (isActive === value) {
      return setActive(false);
    }

    setActive(value);
  };

  const header = (
    <H3 style={{ color: theme.colors.white }}>
      {isTrackNotesPage ? 'Notes' : 'Notes'}
    </H3>
  );

  const content = notes.map((note, index) => (
    <Accordion
      key={note.id}
      id={note.id}
      title={note.question}
      description={note.answer}
      longDescription={isEmployee ? undefined : note.answer}
      noBorder={index === 0}
      isActive={isActive === note.id}
      toggleHandler={toggleHandler}
    />
  ));

  return (
    <div>
      {isTrackNotesPage && <Spacer size={10} />}
      {isTrackNotesPage ? (
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
Notes.propTypes = {
  userType: PropTypes.oneOf(['track', 'employee'])
};
