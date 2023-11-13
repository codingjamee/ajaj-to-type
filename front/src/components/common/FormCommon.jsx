import { Form, Image, Card } from "react-bootstrap";

const FormCommon = ({
  controlId,
  select = false,
  label = "",
  placeholder = "",
  type = "text",
  changeHandler,
  value,
  name = "",
  customClassName,
  optionValue = "",
  optionArr = [],
}) => {
  return (
    <Form.Group
      controlId={controlId}
      className={customClassName}
      style={{ margin: "10px" }}
    >
      {label && <Form.Label>{label}</Form.Label>}
      {/* select가 false인경우. 기본값 */}
      {!select && type !== "file" && (
        <Form.Control
          type={type}
          placeholder={placeholder}
          onChange={(e) => changeHandler(e)}
          value={value}
          name={name}
        />
      )}
      {/* select이면서 file타입이 아닌경우...? */}
      {select && type !== "file" && (
        <Form.Select
          onChange={(e) => changeHandler(e)}
          value={value}
          name={name}
        >
          <option>{optionValue}</option>
          {optionArr?.map((option, index) => (
            <option key={`option-${index}`}>{option.text}</option>
          ))}
        </Form.Select>
      )}
      {/* select가 아니면서 type이 file인 경우 */}
      {!select && type === "file" && (
        <>
          <Card style={{ margin: "10px" }}>
            <Image
              style={{
                width: "100%",
                height: "8rem",
                margin: "0 auto",
              }}
              src={value}
            />
          </Card>
          <Form.Control
            type={type}
            placeholder={placeholder}
            onChange={(e) => changeHandler(e)}
            name={name}
          />
        </>
      )}
    </Form.Group>
  );
};

export default FormCommon;
