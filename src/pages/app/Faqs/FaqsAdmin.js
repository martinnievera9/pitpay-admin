import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteFaq, useGetFaqs, useUpdateOrder } from 'components/Faqs';
import Icon from 'components/Icon';
import Loading from 'components/Loading';
import Paragraph from 'components/Paragraph';
import { FaqEdit } from './FaqEdit';
import { SearchableListContainer } from 'components/SearchableListContainer';
import { DraggableTable } from 'components/Table';
import useTheme from 'hooks/useTheme';

export const FaqsAdmin = () => {
  const [sortableFaqs, setSortableFaqs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [editFaq, setEditFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();
  const { data, loading } = useGetFaqs('admin');
  const deleteFaq = useDeleteFaq();
  const updateOrder = useUpdateOrder();

  const faqs = data?.getFaqs?.results ?? [];

  useEffect(() => {
    if (faqs) {
      setSortableFaqs(faqs);
    }
  }, [faqs]);

  async function reorderFaqs(faqs) {
    setSortableFaqs(faqs);
    const ids = faqs.map(faq => faq.id);
    await updateOrder(ids);
  }

  if (loading) return <Loading />;

  const handleOutClick = () => {
    setEditFaq(null);
    setShowModal(false);

    setTimeout(() => {
      setIsVisible(!isVisible);
    }, 300);
  };

  const columns = [
    {
      label: 'Question',
      key: 'question'
    },
    {
      label: 'Answer',
      key: 'answer'
    },
    {
      label: '',
      key: 'actions'
    }
  ];

  function renderRows(faq) {
    const { answer, id, question } = faq;
    return {
      question,
      answer,
      actions: (
        <div style={{ width: 61 }}>
          <Icon
            icon="edit"
            size={18}
            color={theme.colors.primary}
            onClick={async () => {
              setEditFaq(faq);
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
            color={theme.colors.primary}
            onClick={async () => {
              if (window.confirm('Are you sure you want to delete this one?')) {
                const response = await deleteFaq(id);
                if (response) {
                  toast.success('FAQ Deleted');
                }
              } else {
                return;
              }
            }}
          />
        </div>
      )
    };
  }

  return (
    <>
      <SearchableListContainer
        title="FAQ"
        searchInputPlaceholder="Search FAQ"
        onAddClick={() => {
          setIsVisible(true);

          setTimeout(() => {
            setShowModal(true);
          }, 300);
        }}
      >
        <DraggableTable
          columns={columns}
          items={sortableFaqs}
          noData={
            <Paragraph textAlign="center" lineHeight={100} fontSize={20}>
              No FAQs.
            </Paragraph>
          }
          renderRows={renderRows}
          setItems={reorderFaqs}
        />
      </SearchableListContainer>

      <FaqEdit
        isVisible={showModal}
        handleOutClick={handleOutClick}
        currentFaq={editFaq}
      />
    </>
  );
};
