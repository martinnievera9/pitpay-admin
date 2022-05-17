import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import Emojis from './Emojis';

export const Emoji = styled.span`
  border: 1px solid #e1e4e8;
  margin: 2px;
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 26px;
`;

export const EmojiGrid = styled.div`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: hidden;
`;

export default ({ setText, text, onUpdate }) => {
  const [showEmojis, setShowEmojis] = useState(false);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Icon
          icon={'smile'}
          size={20}
          onClick={() => setShowEmojis(!showEmojis)}
        />
      </div>
      {showEmojis ? (
        <EmojiGrid>
          {Emojis.map((value, key) => (
            <Emoji
              key={key}
              onClick={() => {
                const textLength = text.length;
                const lastCharacter = text[text.length - 1];
                const newText =
                  textLength && lastCharacter !== ' '
                    ? `${text} ${value.symbol}`
                    : text + value.symbol;
                setText(newText);
                setShowEmojis(!showEmojis);
                return onUpdate(newText);
              }}
            >
              {value.symbol}
            </Emoji>
          ))}
        </EmojiGrid>
      ) : null}
    </div>
  );
};
