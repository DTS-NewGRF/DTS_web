import React from 'react';

// 이미지 및 그룹 데이터 (샘플 데이터)
const imageData = [
  {
    src: "https://github.com/DTS-NewGRF/DTS/blob/minengallery/src/locomotive/CDC/CDC_Baekje_Crown.png?raw=true",
    sections: [
      { name: "A", x: 221, y: 0, width: 32, height: 14 },
      { name: "B", x: 221, y: 27, width: 32, height: 14 },
      { name: "C", x: 221, y: 54, width: 32, height: 14 }
    ]
  }
];

const groupData = [
  { groupName: "Group1", images: ["A", "B", "C"] }
];

const ImageGroup = () => {
  return (
    <div className="image-group-page">
      <h1 className="page-title">Image Group Showcase</h1>

      <div className="group-container">
        {groupData.map((group, index) => (
          <div key={index} className="group">
            <h3 className="group-name">{group.groupName}</h3>
            <div className="image-group">
              {group.images.map((name, i) => {
                // 이미지 섹션 찾기
                const section = imageData[0].sections.find(sec => sec.name === name);
                return section ? (
                  <img
                    key={i}
                    src={imageData[0].src}
                    alt={name}
                    className="image-frame"
                    style={{
                      objectPosition: `-${section.x}px -${section.y}px`,
                      width: section.width,
                      height: section.height,
                      objectFit: 'cover'  // 이미지 크기에 맞게 자르기
                    }}
                  />
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGroup;