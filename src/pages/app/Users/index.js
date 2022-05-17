import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import Icon from 'components/Icon';
import LineHeightText from 'components/LineHeightText';
import { SearchableListContainer } from 'components/SearchableListContainer';
import { Table } from 'components/Table';
import { formatPhoneNumber } from 'shared/formatters';
import storage from 'shared/storage';
import Export from './exportAllUsers';
import individualExport from './exportIndividualUser';
import DeleteUser from './gql/mutations/delete-user';
import EmulateUser from './gql/mutations/emulate-user';
import GetSingleUserExport from './gql/mutations/get-user-export';
import { useInactivateUser } from './gql/mutations/useInactivateUser';
import { useGetUsers } from './gql/queries/get-users';
import useOpenUser from './useOpenUser';
import UsersEdit from './UsersEdit';

const FilterContainer = styled.div`
  min-width: 230px;
  margin-left: 25px;

  @media screen and (max-width: 860px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const Users = (props) => {
  const { emulateUser, theme, getSingleUserExport } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userRoleFilter, setUserRoleFilter] = useState(null);
  const [inactivateUser] = useInactivateUser();

  const { data } = useGetUsers(userRoleFilter);

  const columns = [
    {
      label: 'User Name',
      key: 'name',
    },
    {
      label: 'User Email',
      key: 'email',
    },
    {
      label: 'Role',
      key: 'role',
    },
    {
      label: 'Mobile Phone',
      key: 'cellphone',
    },
    {
      label: 'Locations',
      key: 'locations',
    },
    {
      label: '',
      key: 'actions',
    },
  ];

  function renderRows(user) {
    const {
      id,
      last_name,
      first_name,
      middle_name,
      suffix,
      inactive,
      email,
      role,
      cellphone,
      associations,
    } = user;
    return {
      name: (
        <Link
          to={`/admin/users/transactions/${id}`}
          style={{
            color:
              'inactive' === inactive
                ? theme.colors.text.light
                : theme.colors.primary,
          }}
        >
          <LineHeightText>{`${last_name ? `${last_name}, ` : ''}${first_name} ${
            middle_name ? middle_name : ''
          } ${suffix ? `, ${suffix}` : ''}`}</LineHeightText>
        </Link>
      ),
      email,
      role: role.charAt(0).toUpperCase() + role.slice(1),
      cellphone: formatPhoneNumber(cellphone),
      locations: associations.map((item, index) => (
        <p key={index} style={{ lineHeight: 1.5 }}>
          {item}
        </p>
      )),
      actions: (
        <div style={{ display: 'flex' }}>
          <Icon
            icon="edit"
            size={18}
            color={props.theme.colors.primary}
            onClick={async () => {
              setCurrentUser(id);
              setIsVisible(true);
              setTimeout(() => {
                setShowModal(true);
              }, 300);
            }}
            padding="0 15px 0 0"
          />
          <Icon
            icon="trash"
            size={18}
            color={props.theme.colors.primary}
            onClick={async () => {
              if (
                window.confirm('Are you sure you want to delete this user?')
              ) {
                props.deleteUser(id);
              }
            }}
            padding="0 15px 0 0"
          />
          {!inactive && (
            <Icon
              icon="user-minus"
              size={18}
              color={props.theme.colors.primary}
              onClick={async () => {
                if (
                  window.confirm(
                    'Are you sure you want to make this user inacive?'
                  )
                ) {
                  const response = await inactivateUser(id);
                  if (response.data.inactivateUser) {
                    toast.success('This user is now inactive');
                  }

                  if (!response || response.errors) {
                    toast.error(
                      'Something went wrong. Could not make user inactive.'
                    );
                  }
                }
              }}
            />
          )}
          <Icon
            icon="Export-Icon"
            size={18}
            color={props.theme.colors.primary}
            padding="0 15px 0 0"
            onClick={async () => {
              const response = await getSingleUserExport(id);

              if (!response || response.errors) {
                toast.error('Something went wrong with the user export.');
              } else {
                individualExport(response.data.getSingleUserExport);
              }
            }}
          />
          {role === 'track' && (
            <Icon
              icon="user-1"
              size={18}
              color={props.theme.colors.primary}
              onClick={async () => {
                if (
                  window.confirm(
                    'Are you sure you want to log in as this track admin user?'
                  )
                ) {
                  const response = await emulateUser(id);

                  if (!response || response.errors) {
                    toast.error('Something went wrong with the emulation.');
                  } else {
                    storage.set('user', response.data.emulateUser);
                    window.location.reload();
                  }
                }
              }}
              padding="0 0 0 15px"
            />
          )}
        </div>
      ),
    };
  }

  const handleOutClick = () => {
    setCurrentUser(null);
    setShowModal(false);
    setIsVisible(!isVisible);
  };

  useOpenUser((user_id) => {
    setCurrentUser(parseInt(user_id, 10));
    setIsVisible(true);
    setShowModal(true);
  });

  return !data?.getUsers ? (
    <div />
  ) : (
    <>
      <Export icon={<Icon icon="Export-Icon" size={40} />} />
      <SearchableListContainer
        onAddClick={() => {
          setIsVisible(true);
          setShowModal(true);
        }}
        pageCount={data.getUsers.count}
        paginated
        title="Users"
        searchInputPlaceholder="Search users"
        titleBarContent={
          <FilterContainer>
            <AutoSuggest
              placeholder="User Role"
              options={[
                {
                  label: 'User',
                  value: 'user',
                },
                {
                  label: 'Track',
                  value: 'track',
                },
                {
                  label: 'Employee',
                  value: 'employee',
                },
                {
                  label: 'Admin',
                  value: 'admin',
                },
              ]}
              value={
                userRoleFilter
                  ? {
                      label:
                        userRoleFilter.charAt(0).toUpperCase() +
                        userRoleFilter.slice(1),
                      key: userRoleFilter,
                    }
                  : null
              }
              isSearchable
              isClearable
              onChange={(role) => {
                setUserRoleFilter(role?.value ?? null);
              }}
            />
          </FilterContainer>
        }
      >
        <Table
          items={data.getUsers.results}
          columns={columns}
          renderRows={renderRows}
        />
      </SearchableListContainer>

      {isVisible && (
        <UsersEdit
          isVisible={showModal}
          handleOutClick={handleOutClick}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default compose(
  DeleteUser,
  EmulateUser,
  GetSingleUserExport
)(withTheme(Users));
