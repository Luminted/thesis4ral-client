import React, { useLayoutEffect, useRef, useState } from "react";
import "./style.css";
import { IProps } from "./typings";

export const ImageLoader = ({ resourceRoute }: IProps) => {
  const importedImageRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        const { default: namedImport } = await import(`../../resources/${resourceRoute}.svg`);
        importedImageRef.current = namedImport;
        setLoading(false);
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, []);

  return <>
    {!loading && importedImageRef.current && <img alt="" className="svg-container" src={importedImageRef.current} />}
  </>

};
