import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'components/Form/Checkbox';
import { debounce } from 'throttle-debounce';
import { DatePicker } from 'components/Form/DatePicker';
import { Input } from 'components/Form/Input';
import { Select } from 'components/Form/Select';
import { DESCRIPTION_CHARACTER_LIMIT } from '../EventEdit';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import { Col, Row } from 'react-grid-system';

const InputWrapper = styled.div`
  margin-top: 10px;
`;

const CharacterCount = styled.span`
  color: ${(props) => (props.overLimit ? props.theme.colors.error : 'unset')};
  margin-bottom: 6px;
`;


export const OtherTickets = ({
  handleChange,
  COLOR_CODES,
  ticket,
  index,
  ticketType,
}) => {

  const theme = useTheme();
  const [characterCount, setCharacterCount] = useState(0);
  const [specialTicket, setSpecialTicket] = useState(false);
  const [trackPrice, setTrackPrice] = useState(false);
  const [ticketLimit, setTicketLimit] = useState(false);
  const [highlightedTicket, setHighlightedTicket] = useState(false);
  const [lowTicketAlert, setLowTicketAlert] = useState(false);


  return (
   <>
    <div style={{display:'flex', alignItems:'center'}}>
      <Text
        style={{marginRight:'15px'}}
        type="label"
        color={theme.colors.black}
        inlineStyle={{ textTransform: 'capitalize' }}
        >
        Other ticket
      </Text>
      <InputWrapper>
        <DatePicker
          name={`${ticketType}.${index}.start_date`}
          type="date"
          label=""
          value={ticket.start_date}
          onChange={(_, value) =>
            handleChange({ target: { name: 'start_date', value } })
          }
        />
      </InputWrapper>
      <InputWrapper>
        <DatePicker
          name={`${ticketType}.${index}.end_date`}
          type="date"
          label=""
          value={ticket.end_date}
          onChange={(_, value) =>
            handleChange({ target: { name: 'end_date', value } })
          }
        />
      </InputWrapper>
    </div>

    <div style={{display:'flex'}}>
      <InputWrapper style={{maxWidth:'70%', flex:'0 0 70%', marginRight:'15px'}}>
        <Input
          id={`${ticketType}.${index}.name`}
          name={`${ticketType}.${index}.name`}
          label="Ticket Name"
          placeholder=""
          onChange={({ target }) =>
            handleChange({
              target: {
                name: `name`,
                value: target.value,
              },
            })
          }
          value={ticket.name ?? ''}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          id={`${ticketType}.${index}.price`}
          name={`${ticketType}.${index}.price`}
          label="Ticket Price"
          type="number"
          placeholder=""
          onChange={({ target }) =>
            handleChange({
              target: {
                name: `price`,
                value: parseFloat(target.value),
              },
            })
          }
          value={ticket.price ?? ''}
        />
      </InputWrapper>
    </div>

    <div style={{display:'flex'}}>
      <InputWrapper style={{maxWidth:'70%', flex:'0 0 70%', marginRight:'15px'}}>
        <Input
          as="textarea"
          labelRight={
            <CharacterCount
              overLimit={characterCount > DESCRIPTION_CHARACTER_LIMIT}
            >
              {characterCount} characters
            </CharacterCount>
          }
          rows={4}
          inputStyle={{ minHeight: 'unset' }}
          id={`${ticketType}.${index}.description`}
          name={`${ticketType}.${index}.description`}
          label="Description"
          placeholder=""
          onChange={({ target }) => {
            typeof target.value === 'string' &&
              debounce(300, setCharacterCount(target.value.length));
            handleChange({
              target: {
                name: `description`,
                value: target.value,
              },
            });
          }}
          value={ticket.description ?? ''}
        />
      </InputWrapper>

      <InputWrapper>
        <Select
          id={`${ticketType}.${index}.color_code`}
          name={`${ticketType}.${index}.color_code`}
          label="Color Code"
          placeholder="Select a Color"
          options={COLOR_CODES}
          onChange={({ target }) =>
            handleChange({
              target: {
                name: `color_code`,
                value: target.value,
              },
            })
          }
          value={ticket.color_code}
          backgroundColor={ticket.color_code}
        />
      </InputWrapper>
    </div>

    <Row>
      <Col>
        <Checkbox
          myStyle={{marginTop:'30px'}}
          name="special_ticket_fee"
          className="special_ticket_fee"
          checked={specialTicket}
          onChange={(event) => {
            const value = event.target?.checked;
            setSpecialTicket(value)
          }}
          rightText="Special Ticket Fee"
          
        />
      </Col>
      <Col>
        {specialTicket && <>
        <InputWrapper>
          <Input
            style={{marginRight:'15px'}}
            id={`${ticketType}.${index}.fee_dollar`}
            name={`${ticketType}.${index}.fee_dollar`}
            label="Dollar Amount"
            type="number"
            placeholder=""
            onChange={({ target }) =>
              handleChange({
                target: {
                  name: `fee_dollar`,
                  value: parseFloat(target.value),
                },
              })
            }
            value={ticket.fee_dollar ?? ''}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            style={{marginRight:'15px'}}
            id={`${ticketType}.${index}.fee_percent`}
            name={`${ticketType}.${index}.fee_percent`}
            label="Fee Percent"
            type="number"
            placeholder=""
            onChange={({ target }) =>
              handleChange({
                target: {
                  name: `fee_percent`,
                  value: parseFloat(target.value),
                },
              })
            }
            value={ticket.fee_percent ?? ''}
          />
        </InputWrapper>
        </>
        }
      </Col>
      <Col>
        <Checkbox
          myStyle={{marginTop:'30px'}}
          name="is_featured"
          className="highlighted"
          checked={highlightedTicket}
          onChange={(event) => {
            const value = event.target?.checked;
            setHighlightedTicket(value)
            handleChange({
              target: {
                name: 'is_featured',
                value,
              },
            });
           
          }}
        
          rightText="Highlighted ticket"
        />
      </Col>
      <Col>
      <InputWrapper>
        <Input
          id={`${ticketType}.${index}.featured_text`}
          name={`${ticketType}.${index}.featured_text`}
          label="Name"
          type="text"
          placeholder=""
          onChange={({ target }) =>
            handleChange({
              target: {
                name: `featured_text`,
                value: target.value,
              },
            })
          }
          value={ticket.featured_text ?? ''}
        />
        </InputWrapper>
      </Col>
    </Row>
    <Row>
      <Col>
        <Checkbox
          myStyle={{marginTop:'20px'}}
          name="track_price"
          className="track_price"
          checked={trackPrice}
          onChange={(event) => {
            const value = event.target?.checked;
          
            setTrackPrice(value)
          }}
          rightText="Display At Track Price"
        />
      </Col>
      <Col>
        {trackPrice && 
          <InputWrapper>
            <Input
              style={{marginRight:'15px'}}
              id={`${ticketType}.${index}.track_price`}
              name={`${ticketType}.${index}.track_price`}
              label="At Track Price"
              type="number"
              placeholder=""
              onChange={({ target }) =>
                handleChange({
                  target: {
                    name: `track_price`,
                    value: parseFloat(target.value),
                  },
                })
              }
              value={ticket.track_price ?? ''}
            />
          </InputWrapper>
        }
      </Col>
      <Col></Col>
      <Col></Col>
    </Row>
      {/* <div style={{display:'flex', alignItems:'center'}}> */}
        <Row>
          <Col>
          <Checkbox
            myStyle={{marginTop:'20px', marginRight:'15px'}}
            name="ticket_limit"
            className="ticket_limit"
            checked={ticketLimit}
            onChange={(event) => {
              const value = event.target?.checked;
             
              setTicketLimit(value)
            }}
            rightText="Ticket Limit"
          />
          </Col>
          <Col>
            {ticketLimit && 
              <InputWrapper>
                <Input
                  style={{marginRight:'15px'}}
                  id={`${ticketType}.${index}.limit`}
                  name={`${ticketType}.${index}.limit`}
                  label="Limit"
                  type="text"
                  placeholder=""
                  onChange={({ target }) =>
                    handleChange({
                      target: {
                        name: `limit`,
                        value: parseInt(target.value),
                      },
                    })
                  }
                  value={ticket.limit ?? ''}
                />
            </InputWrapper>
          }
          </Col>
          <Col>
        <Checkbox
          myStyle={{marginTop:'20px', marginRight:'15px'}}
          name="low_ticket_alert"
          className="low_ticket_alert"
          checked={lowTicketAlert}
          onChange={(event) => {
          const value = event.target?.checked;
          setLowTicketAlert(value);
         
        }}
        rightText="Low Ticket Alert"
      />
      </Col>
      <Col></Col>
      </Row>
      {/* </div> */}
  </>
  );
};

