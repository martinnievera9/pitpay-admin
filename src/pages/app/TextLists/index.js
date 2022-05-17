import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import Icon from 'components/Icon';
import Loading from 'components/Loading';
import Paragraph from 'components/Paragraph';
import { SearchableListContainer } from 'components/SearchableListContainer';
import {
  TableComponent as Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from 'components/Table';
import DeleteTextList from './gql/mutations/delete-list';
import GetLists from './gql/queries/get-lists';
import TextListEdit from './TextListEdit';

const TextLists = ({ deleteTextList, ...props }) => {
  const { data } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [textList, setEditTextList] = useState(null);

  const handleOutClick = () => {
    setIsVisible(!isVisible);
    setEditTextList(null);
  };

  if (props.data.loading) return <Loading />;

  return (
    <>
      <SearchableListContainer
        pageCount={props.data.getLists.count}
        paginated
        onAddClick={() => setIsVisible(!isVisible)}
        searchInputPlaceholder="Search Text Lists"
        title="Text Lists"
      >
        {data.getLists.results.length < 1 ? (
          <Paragraph textAlign="center" lineHeight={100} fontSize={20}>
            No Text Lists.
          </Paragraph>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell scope="col" colSpan={10}>
                  Name
                </TableCell>
                <TableCell scope="col" colSpan={10}>
                  Text Code
                </TableCell>
                <TableCell scope="col" colSpan={10}>
                  List Size
                </TableCell>
                <TableCell scope="col" colSpan={10}>
                  Messages Sent (YTD)
                </TableCell>
                <TableCell scope="col" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.getLists.results.map((item) => (
                <TableRow key={item.id}>
                  <TableCell colSpan={10}>{item.name}</TableCell>
                  <TableCell colSpan={10}>{item.code}</TableCell>
                  <TableCell colSpan={10}>{item.recipient_count}</TableCell>
                  <TableCell colSpan={10}>{item.messages_sent}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Icon
                        icon="edit"
                        size={18}
                        color={props.theme.colors.primary}
                        onClick={async () => {
                          setEditTextList(item);
                          setIsVisible(!isVisible);
                        }}
                        padding="0 15px 0 0"
                      />
                      <Icon
                        icon="trash"
                        size={18}
                        color={props.theme.colors.primary}
                        onClick={async () => {
                          const successMessage = () =>
                            toast.success('Text List Successfully Deleted');
                          const errorMessage = () =>
                            toast.error('Error Deleting Text List');
                          if (
                            window.confirm(
                              'Are you sure you want to delete this one?'
                            )
                          ) {
                            const response = await deleteTextList({
                              id: item.id,
                            });
                            if (!response || response.errors) {
                              errorMessage();
                            }
                            successMessage();
                          } else {
                            return;
                          }
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SearchableListContainer>
      <TextListEdit
        isVisible={isVisible}
        handleOutClick={handleOutClick}
        currentList={textList}
      />
    </>
  );
};

export default withTheme(compose(GetLists, DeleteTextList)(TextLists));
