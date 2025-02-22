import { CustomFormLabel } from '@/screens/components/form-lable';
import { AnyObject } from '@/types';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

interface SelectInput {
  control: Control<AnyObject>;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  error?: FieldError;
  required?: boolean;
}

const SelectInput: React.FC<SelectInput> = ({ control, name, label, options, error, required }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <CustomFormLabel className='text-[14px] text-[#637381]'>{label}{required && <span className='text-red-500'> *</span>}</CustomFormLabel>
          <CreatableSelect
            className='mt-2 text-[#637381] text-[14px] w-full'
            isClearable
            options={options}
            value={options.find(option => option.value === field.value) || null}
            onChange={selectedOption => {
              const value = selectedOption ? selectedOption.value : '';
              field.onChange(value);
            }}
            placeholder='Nhập nơi cấp hoặc chọn'
          />
          {error && <div className='font-medium text-red-500 text-sm mt-1'>{error.message}</div>}
        </div>
      )}
    />
  );
};

export default SelectInput;
