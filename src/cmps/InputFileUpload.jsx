import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { uploadService } from '../services/upload.service'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload({ onUploaded = null }) {

    const [isUploading, setIsUploading] = useState(false)

    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        setIsUploading(false)
        onUploaded && onUploaded(secure_url)
    }

    function getUploadLabel() {
        return isUploading ? 'Uploading....' : 'Upload Image'
    }

    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                {getUploadLabel()}
                <VisuallyHiddenInput
                    type="file"
                    onChange={uploadImg} accept="img/*" id="imgUpload"
                />
            </Button>
        </>

    );
}
