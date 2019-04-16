import { Message } from '@alifd/next';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
const msgOperate = (msgStr) => {
  let isFunction =false;
  let msg = JSON.parse(msgStr);
  try{
    isFunction = typeof(eval(msg.topic))=="function"
  }catch(e){}
  
  if(isFunction) {
    Message.warning('showFace is a Function!');
    return eval(msg.topic);
  }else{
    Message.warning('showFace is not a Function!');
    return '';
  }
  
};

export const pageFresh = (params) => {
 return msgOperate(params);
};
