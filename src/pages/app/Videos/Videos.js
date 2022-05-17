import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Container from 'components/Container';
import ContainerHeader from 'components/ContainerHeader';
import ContainerIcon from 'components/ContainerIcon';
import Icon from 'components/Icon';
import LineHeightText from 'components/LineHeightText';
import { SearchInput } from 'components/Form/SearchInput';
import { DraggableTable } from 'components/Table';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import { useGetVideosV2, useUpdateVideoOrder, useDeleteVideo } from './gql';
import VideosEdit from './VideosEdit';
import { toast } from 'react-toastify';
import Spacer from 'components/Spacer';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BackgroundImage = styled.div`
  width: 106px;
  height: 60px;
  background: url(${props => props.image});
  background-size: contain;
`;

export const Videos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [editVideo, setEditVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newVideo, setNewVideo] = useState(false);
  const [sortableVideos, setSortableVideos] = useState([]);
  const { colors } = useTheme();

  const history = useHistory();
  const deleteVideo = useDeleteVideo();
  const updateVideoOrder = useUpdateVideoOrder();

  function reorderVideos(videos) {
    setSortableVideos(videos);
    const ids = videos.map(video => video.id);
    void updateVideoOrder(ids);
  }

  const { videos } = useGetVideosV2();

  useEffect(() => {
    if (videos) {
      setSortableVideos(videos);
    }
  }, [videos]);

  const columns = [
    {
      label: 'Thumbnail',
      key: 'thumbnail'
    },
    {
      label: 'Video Title',
      key: 'title'
    },
    {
      label: 'Video Description',
      key: 'description'
    },
    {
      label: 'Length',
      key: 'length'
    },
    {
      label: '',
      key: 'actions'
    }
  ];

  function renderRows(rowData) {
    const { id, image, title, description, runtime } = rowData;
    return {
      thumbnail: <BackgroundImage image={image} />,
      title: <LineHeightText>{title}</LineHeightText>,
      description: <LineHeightText>{description}</LineHeightText>,
      length: runtime,
      actions: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <Icon
            icon="edit"
            size={18}
            color={colors.primary}
            onClick={async () => {
              setEditVideo(id);
              setIsVisible(true);
              setTimeout(() => {
                setShowModal(true);
              }, 300);
            }}
            padding="0 15px 0 0"
          />
          <Spacer size={15} />
          <Icon
            icon="trash"
            size={18}
            color={colors.primary}
            onClick={async () => {
              const successMessage = () =>
                toast.success('Video Successfully Deleted');
              const errorMessage = () => toast.error('Error Deleting Video');

              if (
                window.confirm('Are you sure you want to delete this video?')
              ) {
                const response = await deleteVideo(id);
                if (!response || response.errors) {
                  errorMessage();
                } else {
                  successMessage();
                }
              }
            }}
          />
        </div>
      )
    };
  }

  const handleOutClick = () => {
    setEditVideo(null);
    setShowModal(false);
    setTimeout(() => {
      setIsVisible(!isVisible);
    }, 300);
  };

  const handleChange = e => setSearch(e.target.value);

  const handleBlur = e => {
    history.push(`/admin/videos/?queryString=${e.target.value}`);
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      history.push(`/admin/videos/?queryString=${e.target.value}`);
    }
  };

  return !videos ? (
    <div />
  ) : (
    <>
      <Container>
        <ContainerHeader>
          <TitleContainer>
            <Text
              type="heading"
              color="#3C4144"
              inlineStyle={{ marginRight: 25 }}
            >
              Videos
            </Text>
            <SearchInput
              placeholder="Search videos"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
              value={search}
            />
          </TitleContainer>
          <ContainerIcon
            onClick={() => {
              setIsVisible(true);
              setNewVideo(true);
              setTimeout(() => {
                setShowModal(true);
              }, 300);
            }}
          />
        </ContainerHeader>
        <div style={{ padding: 20 }}>
          <DraggableTable
            items={sortableVideos}
            setItems={reorderVideos}
            columns={columns}
            renderRows={renderRows}
          />
        </div>
      </Container>
      {isVisible && (
        <VideosEdit
          newVideo={newVideo}
          isVisible={showModal}
          handleOutClick={handleOutClick}
          currentVideo={editVideo}
        />
      )}
    </>
  );
};
