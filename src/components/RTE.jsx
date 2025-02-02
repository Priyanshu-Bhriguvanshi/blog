import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { config } from "../config/config";

const RTE = ({ name, control, defaultValue = "", label }) => {
  return (
    <div>
      {label && <label>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={config.tinymceApi}
            value={value} // Controlled value from react-hook-form
            onEditorChange={onChange} // Updates react-hook-form when content changes
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount"
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help"
            }}
          />
        )}
      />
    </div>
  );
};

export default RTE;
