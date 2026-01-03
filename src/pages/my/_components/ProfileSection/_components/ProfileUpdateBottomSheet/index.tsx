/* eslint-disable react-refresh/only-export-components */
import { css } from "@emotion/react";
import BottomSheet from "@/@lib/components/BottomSheet";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { useEffect, useRef, useState } from "react";
import { overlay } from "overlay-kit";
import ImageIcon from "./_assets/image_icon.svg?react";
import {
  useGetProfileQuery,
  usePatchProfileMutation,
} from "@/hooks/@server/member";
import RemoveIcon from "./_assets/remove.svg?react";

export const openProfileUpdateBottomSheet = () => {
  overlay.open(({ isOpen, close }) => (
    <ProfileUpdateBottomSheet isOpen={isOpen} onClose={close} />
  ));
};

interface ProfileUpdateBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileUpdateBottomSheet = ({
  isOpen,
  onClose,
}: ProfileUpdateBottomSheetProps) => {
  const [nickname, setNickname] = useState("");
  const { data: profile, refetch } = useGetProfileQuery();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { mutate: patchProfile } = usePatchProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const formData = new FormData();
    if (nickname) {
      formData.append(
        "nickname",
        new Blob([JSON.stringify({ nickname })], { type: "application/json" })
      );
    } else {
      formData.append(
        "nickname",
        new Blob([JSON.stringify({ nickname: nickname || profile.nickname })], {
          type: "application/json",
        })
      );
    }
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    patchProfile(formData, {
      onSuccess: () => {
        refetch();
        onClose();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setProfileImage(null);
  };

  useEffect(() => {
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(URL.createObjectURL(profileImage));
      }
    };
  }, [profileImage]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div css={containerStyle}>
        {/* Grabber */}
        <div css={grabberStyle} />

        {/* Header */}
        <div css={headerStyle}>
          <h2 css={titleStyle}>프로필 변경</h2>
        </div>

        {/* Body Content */}
        <div css={bodyStyle}>
          {/* Profile Image Placeholder */}
          <div css={imageContainerStyle}>
            <div
              css={imagePlaceholderStyle}
              onClick={() => fileInputRef.current?.click()}
            >
              {profileImage ? (
                <>
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="profile image"
                    width={82}
                    height={82}
                    css={imageStyle}
                  />
                  <RemoveIcon
                    css={removeImageIconStyle}
                    onClick={handleRemoveImage}
                  />
                </>
              ) : (
                <img
                  src={profile.profileImage ?? "https://placehold.co/82x82"}
                  alt="profile image"
                  width={82}
                  height={82}
                  css={imageStyle}
                />
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              css={hiddenInputStyle}
            />
          </div>

          {/* Nickname Input */}
          <div css={inputSectionStyle}>
            <label css={labelStyle}>닉네임</label>
            <input
              css={inputStyle}
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={profile.nickname}
            />
          </div>
        </div>

        {/* Buttons */}
        <div css={buttonContainerStyle}>
          <button css={outlinedButtonStyle} onClick={onClose}>
            닫기
          </button>
          <button css={containedButtonStyle} onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

// Styles
const containerStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
});

const grabberStyle = css({
  width: 36,
  height: 5,
  backgroundColor: "rgba(60, 60, 67, 0.3)",
  borderRadius: 2.5,
});

const headerStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
});

const titleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    textAlign: "center",
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const bodyStyle = css({
  width: "100%",
  maxWidth: 343,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
});

const imageContainerStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
});

const imagePlaceholderStyle = css({
  width: 82,
  height: 82,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  border: `1px dashed rgba(112, 115, 124, 0.22)`,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  position: "relative",
});

const imageStyle = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  overflow: "hidden",
  borderRadius: "50%",
});

const removeImageIconStyle = css({
  position: "absolute",
  top: 0,
  right: 0,
});

const hiddenInputStyle = css({
  display: "none",
});

const inputSectionStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const labelStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    textAlign: "left",
    width: "100%",
  },
  TYPOGRAPHY.BODY["14SB"]
);

const inputStyle = css(
  {
    width: "100%",
    padding: 12,
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 8,
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    outline: "none",

    "&::placeholder": {
      color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    },

    "&:focus": {
      borderColor: THEME.COLORS.PRIMARY.RED,
    },
  },
  TYPOGRAPHY.BODY["14R"]
);

const buttonContainerStyle = css({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const outlinedButtonStyle = css(
  {
    flex: 1,
    height: 44,
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: THEME.COLORS.GRAYSCALE.NORMAL,

    "&:hover": {
      backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
    },
  },
  TYPOGRAPHY.BODY["14SB"]
);

const containedButtonStyle = css(
  {
    flex: 1,
    height: 44,
    backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
    border: "none",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: THEME.COLORS.BACKGROUND.WHITE,

    "&:hover": {
      opacity: 0.9,
    },
  },
  TYPOGRAPHY.BODY["14SB"]
);

export default ProfileUpdateBottomSheet;
