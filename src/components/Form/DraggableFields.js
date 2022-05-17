import styled from 'styled-components';

export const DraggableRow = styled.div`
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  margin-left: -21px;
  width: calc(100% + 21px);
`;

export const IconWrapper = styled.div`
  color: ${props => props.theme.colors.text.light};
`;

export const FormWrapper = styled.div`
  flex: 1;
`;

/**
 * Takes an array of objects with a `order` property, which might
 * not be set yet. When we render the array into form fields, we'll
 * use the `order` property as our `key` because new items won't
 * have an `id` property to use. But some items won't have an `order`
 * either, and we can just make it up on our own, because it won't
 * be passed to the mutation when the form is submitted.
 */

export function getHighestItemOrderNumber(items) {
  return items.reduce(
    (highest, item) => (item.order > highest ? item.order : highest),
    0
  );
}

export function getOrderedItems(items) {
  const initialHighestOrderNumber = getHighestItemOrderNumber(items);

  const itemsWithOrderNumbers = items.map((item, index) => ({
    ...item,
    order: item.order ?? initialHighestOrderNumber + index + 1
  }));

  return itemsWithOrderNumbers;
}
