import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ReactComponent as SearchSvg } from '../../assets/svg/search.svg';
import { productOriginalListAtom } from '../../module/ProductModule';
import { IProduct } from '../../type/products';

interface ISearchItemList {
  searchList: IProduct[];
}

const SearchItemList = ({ searchList }: ISearchItemList) => {
  return (
    <ul className="!fixed left-0 sm:!absolute sm:top-14 menu dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto bg-white dark:bg-gray-600">
      {searchList.length !== 0 &&
        searchList.map((item) => (
          <li>
            <Link
              to={`product/${item.id}`}
              className="text-left js-searchedItem"
            >
              <span className="text-gray-600 dark:text-white line-clamp-2">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
    </ul>
  );
};

const SearchInput = () => {
  const originalProductList = useRecoilValue(productOriginalListAtom);
  const [inputSearch, setInputSearch] = useState('');

  const searchedDataTest = useMemo(
    () =>
      originalProductList.filter((item) => {
        if (inputSearch === '') return false;
        return item.title.toUpperCase().includes(inputSearch.toUpperCase());
      }),
    [inputSearch],
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  return (
    <div className="dropdown">
      <button
        type="button"
        className="flex sm:hidden w-10 sm:w-auto mx-0 px-0 sm:mx-2 sm:px-2 btn btn-ghost js-search"
      >
        <SearchSvg />
      </button>
      <input
        type="text"
        className="fixed left-0 top-4 -z-10 opacity-0 sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white sm:transform-none transition-all js-searchInput"
        placeholder="검색"
        value={inputSearch}
        onChange={handleOnChange}
      />
      <SearchItemList searchList={searchedDataTest} />
    </div>
  );
};

export default SearchInput;
